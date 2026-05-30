const HostelRoom = require('../models/HostelRoom');

/**
 * Normalize hostel type to lowercase
 * @param {string} type - Hostel type (e.g., "Boys", "GIRLS", "boys")
 * @returns {string} Normalized type ("boys" or "girls")
 */
const normalizeHostelType = (type) => {
  return type?.toLowerCase() || '';
};

/**
 * Normalize room type to lowercase
 * @param {string} type - Room type (e.g., "AC", "Non-AC", "non-ac")
 * @returns {string} Normalized type ("ac" or "non-ac")
 */
const normalizeRoomType = (type) => {
  const lower = type?.toLowerCase() || '';
  return lower.includes('non') ? 'non-ac' : 'ac';
};

/**
 * Get total available beds for a given hostel and room type
 * @param {string} hostelType - Hostel type (e.g., "Boys", "girls")
 * @param {string} roomType - Room type (e.g., "AC", "non-AC")
 * @returns {Promise<number>} Number of available beds
 */
const calculateAvailableBeds = async (hostelType, roomType) => {
  const normalizedHostelType = normalizeHostelType(hostelType);
  const normalizedRoomType = normalizeRoomType(roomType);
  
  console.log(`[Availability Service] Calculating available beds for: ${normalizedHostelType} / ${normalizedRoomType}`);
  
  const result = await HostelRoom.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $toLower: "$hostelType" }, normalizedHostelType],
        },
      },
    },
    {
      $match: {
        $expr: {
          $eq: [{ $toLower: "$roomType" }, normalizedRoomType],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAvailable: { $sum: "$availableBeds" },
      },
    },
  ]);

  const availableBeds = result[0]?.totalAvailable || 0;
  console.log(`[Availability Service] Found ${availableBeds} available beds`);
  return availableBeds;
};

/**
 * Get formatted availability stats for all categories (used by dashboard)
 * @returns {Promise<Object>} Formatted stats { boys: { ac: 0, nonAc: 0 }, girls: ... }
 */
const getAvailabilityStats = async () => {
  console.log('[Availability Service] Getting full availability stats');
  
  const stats = await HostelRoom.aggregate([
    {
      $group: {
        _id: { 
          hostelType: { $toLower: "$hostelType" }, 
          roomType: { $toLower: "$roomType" } 
        },
        totalBeds: { $sum: "$totalBeds" },
        occupiedBeds: { $sum: "$occupiedBeds" },
        availableBeds: { $sum: "$availableBeds" },
        roomCount: { $sum: 1 }
      }
    }
  ]);
  
  console.log('[Availability Service] Aggregation result:', stats);
  
  const formattedStats = {
    boys: { ac: 0, nonAc: 0 },
    girls: { ac: 0, nonAc: 0 }
  };
  
  stats.forEach(stat => {
    const hostelType = stat._id.hostelType;
    const roomType = stat._id.roomType;
    const typeKey = roomType.includes('non') ? 'nonAc' : 'ac';
    
    if (formattedStats[hostelType]) {
      formattedStats[hostelType][typeKey] = stat.availableBeds;
    }
  });
  
  console.log('[Availability Service] Formatted stats:', formattedStats);
  return formattedStats;
};

/**
 * Check if there are any rooms available for a given type
 * @param {string} hostelType 
 * @param {string} roomType 
 * @returns {Promise<boolean>} True if available
 */
const hasAvailableBeds = async (hostelType, roomType) => {
  const available = await calculateAvailableBeds(hostelType, roomType);
  console.log(`[Availability Service] hasAvailableBeds: ${available > 0}`);
  return available > 0;
};

/**
 * Find a room to allocate (first with available beds)
 * @param {string} hostelType 
 * @param {string} roomType 
 * @returns {Promise<Object|null>} Room document or null
 */
const findAvailableRoom = async (hostelType, roomType) => {
  const normalizedHostelType = normalizeHostelType(hostelType);
  const normalizedRoomType = normalizeRoomType(roomType);
  
  const rooms = await HostelRoom.find({
    $expr: {
      $eq: [{ $toLower: "$hostelType" }, normalizedHostelType],
      $eq: [{ $toLower: "$roomType" }, normalizedRoomType],
    },
    availableBeds: { $gt: 0 }
  }).sort({ roomNumber: 1 });
  
  return rooms[0] || null;
};

module.exports = {
  normalizeHostelType,
  normalizeRoomType,
  calculateAvailableBeds,
  getAvailabilityStats,
  hasAvailableBeds,
  findAvailableRoom
};