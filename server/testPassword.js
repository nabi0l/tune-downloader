require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    const users = await User.find({});
    console.log(`Found ${users.length} users`);
    
    for (const user of users) {
      console.log(`\nUser: ${user.email}`);
      console.log(`Display Name: ${user.displayName || 'Not set'}`);
      console.log(`Has password: ${!!user.password}`);
      console.log(`Password length: ${user.password ? user.password.length : 0}`);
      console.log(`Password value: ${user.password || 'NULL'}`);
      
      if (user.password) {
        try {
          // Test with a dummy password
          const result = await user.comparePassword('testpassword');
          console.log(`Password comparison test: ${result}`);
        } catch (error) {
          console.log(`Password comparison error: ${error.message}`);
        }
      } else {
        console.log('No password to test');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testPassword(); 