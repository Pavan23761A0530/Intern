require('dotenv').config();
const mongoose = require('mongoose');
const HostelRoom = require('./models/HostelRoom');

async function fixHostelRoomData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');

    const rooms = await HostelRoom.find();
    console.log(`📊 Found ${rooms.length} Hostel Rooms`);

    let updatedCount = 0;

    for (const room of rooms) {
      let shouldUpdate = false;

      // Normalize hostelType
      const hostelTypeLower = room.hostelType?.toLowerCase();
      if (room.hostelType !== hostelTypeLower) {
        console.log(`Updating hostelType from ${room.hostelType} to ${hostelTypeLower}`);
        room.hostelType = hostelTypeLower;
        shouldUpdate = true;
      }

      // Normalize roomType
      let roomTypeLower = room.roomType?.toLowerCase();
      roomTypeLower = roomTypeLower?.includes('non') ? 'non-ac' : 'ac';

      if (room.roomType !== roomTypeLower) {
        console.log(`Updating roomType from ${room.roomType} to ${roomTypeLower}`);
        room.roomType = roomTypeLower;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        await room.save();
        updatedCount++;
      }
    }

    console.log(`✅ Updated ${updatedCount} Hostel Rooms!`);
    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

fixHostelRoomData();