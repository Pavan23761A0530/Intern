const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const HostelRoom = require('../models/HostelRoom');

// Load env vars from specific path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedRooms = async () => {
  try {
    // Set DNS servers for MongoDB connection fix
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing rooms
    await HostelRoom.deleteMany();
    console.log('Cleared existing rooms.');

    const rooms = [];

    // 1. Boys AC Rooms (15)
    for (let i = 101; i <= 115; i++) {
      rooms.push({
        roomNumber: `BAC-${i}`,
        hostelType: 'Boys',
        roomType: 'AC',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4
      });
    }

    // 2. Boys Non-AC Rooms (15)
    for (let i = 101; i <= 115; i++) {
      rooms.push({
        roomNumber: `BNON-${i}`,
        hostelType: 'Boys',
        roomType: 'Non-AC',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4
      });
    }

    // 3. Girls AC Rooms (15)
    for (let i = 101; i <= 115; i++) {
      rooms.push({
        roomNumber: `GAC-${i}`,
        hostelType: 'Girls',
        roomType: 'AC',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4
      });
    }

    // 4. Girls Non-AC Rooms (15)
    for (let i = 101; i <= 115; i++) {
      rooms.push({
        roomNumber: `GNON-${i}`,
        hostelType: 'Girls',
        roomType: 'Non-AC',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4
      });
    }

    await HostelRoom.insertMany(rooms);
    console.log(`Successfully seeded ${rooms.length} hostel rooms.`);
    
    process.exit();
  } catch (err) {
    console.error(`Seeding error: ${err.message}`);
    process.exit(1);
  }
};

seedRooms();
