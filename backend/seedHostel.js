const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HostelRoom = require('./models/HostelRoom');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedHostel = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for hostel seeding...');

    await HostelRoom.deleteMany({});

    const rooms = [];

    // Boys Hostel - AC (5 rooms, 4 beds each)
    for (let i = 1; i <= 5; i++) {
      rooms.push({
        roomNumber: `B-AC-${i}`,
        hostelType: 'boys',
        roomType: 'ac',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4,
        status: 'available'
      });
    }
    // Boys Hostel - Non-AC (5 rooms, 4 beds each)
    for (let i = 1; i <= 5; i++) {
      rooms.push({
        roomNumber: `B-NON-AC-${i}`,
        hostelType: 'boys',
        roomType: 'non-ac',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds: 4,
        status: 'available'
      });
    }

    // Girls Hostel - AC (5 rooms,4 beds each)
    for (let i = 1; i <=5; i++) {
      rooms.push({
        roomNumber: `G-AC-${i}`,
        hostelType: 'girls',
        roomType: 'ac',
        totalBeds: 4,
        occupiedBeds: 0,
        availableBeds:4,
        status: 'available'
      });
    }
    // Girls Hostel - Non-AC (5 rooms,4 beds each)
    for (let i=1; i<=5; i++) {
      rooms.push({
        roomNumber: `G-NON-AC-${i}`,
        hostelType: 'girls',
        roomType: 'non-ac',
        totalBeds:4,
        occupiedBeds:0,
        availableBeds:4,
        status: 'available'
      });
    }

    await HostelRoom.insertMany(rooms);
    console.log('✅ Hostel Rooms seeded successfully! (20 rooms, 4 beds each)');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHostel();
