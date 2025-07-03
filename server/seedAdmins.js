const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform';

const admins = [
  {
    email: 'labi44347@gmail.com',
    displayName: 'Admin User',
    role: 'admin',
    password: 'admin123456',
    favorites: [],
  },
  // Add more admins here if needed
];

async function seedAdmins() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  for (const adminData of admins) {
    let user = await User.findOne({ email: adminData.email });
    if (!user) {
      user = new User(adminData);
      await user.save();
      console.log(`Admin user created: ${adminData.email}`);
    } else {
      console.log(`Admin user already exists: ${adminData.email}`);
    }
  }

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seedAdmins().catch(err => {
  console.error('Error seeding admins:', err);
  mongoose.disconnect();
}); 