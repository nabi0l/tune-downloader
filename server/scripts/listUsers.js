const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Find all users
    const users = await User.find({}).select('email role createdAt');
    
    if (users.length === 0) {
      console.log('No users found in the database.');
    } else {
      console.log('\nRegistered users:');
      console.log('-----------------');
      users.forEach(user => {
        console.log(`Email: ${user.email}`);
        console.log(`Role: ${user.role || 'user'}`);
        console.log(`Created: ${user.createdAt}`);
        console.log('-----------------');
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
