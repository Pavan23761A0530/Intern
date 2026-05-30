require('dotenv').config();
const mongoose = require('mongoose');
const HostelRoom = require('./models/HostelRoom');

async function checkHostelData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');

    const rooms = await HostelRoom.find();
    console.log(`📊 Total Hostel Rooms: ${rooms.length}`);
    console.log('🏠 Sample Room:', rooms[0] ? JSON.stringify(rooms[0], null, 2) : 'No rooms');

    // Group manually
    const manualStats = {
      boys: { ac: 0, nonAc: 0 },
      girls: { ac: 0, nonAc: 0 }
    };

    rooms.forEach(room => {
      const typeKey = room.roomType.includes('non') ? 'nonAc' : 'ac';
      const hostelKey = room.hostelType.toLowerCase();
      if (manualStats[hostelKey]) {
        manualStats[hostelKey][typeKey] += room.availableBeds;
      }
      console.log(`Room ${room.roomNumber}: type=${room.roomType}, hostel=${room.hostelType}, available=${room.availableBeds}, occupied=${room.occupiedBeds}, total=${room.totalBeds}`);
    });

    console.log('\n📈 Manual Stats:', manualStats);

    const stats = await HostelRoom.aggregate([
      {
        $group: {
          _id: { hostelType: "$hostelType", roomType: "$roomType" },
          totalBeds: { $sum: "$totalBeds" },
          occupiedBeds: { $sum: "$occupiedBeds" },
          availableBeds: { $sum: "$availableBeds" },
          roomCount: { $sum: 1 }
        }
      }
    ]);
    console.log('\n📊 Aggregation Stats:', stats);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

checkHostelData();