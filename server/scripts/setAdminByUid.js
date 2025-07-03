const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to set admin role by Firebase UID
async function setAdminByUid(firebaseUid) {
  try {
    // Find or create user with this UID
    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { 
        $set: { 
          role: 'admin',
          // Add any other default fields you want to set
          email: 'labi44347@gmail.com' // Optional: set email if creating new user
        }
      },
      { 
        new: true, 
        upsert: true, // Create the user if not exists
        setDefaultsOnInsert: true
      }
    );

    console.log('User updated/created:', {
      email: user.email || 'No email set',
      firebaseUid: user.firebaseUid,
      role: user.role,
      _id: user._id
    });

    return user;
  } catch (error) {
    console.error('Error setting admin role:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run the function with the provided UID
const FIREBASE_UID = 'XwJehNWd96Vy2tkR9oPmD0AR4LS2';
setAdminByUid(FIREBASE_UID)
  .then(() => console.log('Admin setup complete!'))
  .catch(console.error);
