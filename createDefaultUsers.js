require('dotenv').config();
const mongoose = require('mongoose'); 
const User = require('./models/User'); 

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://darkgods:Darkgods@cluster0.moku5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const createDefaultUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Check and create admin
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        username: 'admin',
        password: '1234', // Use plain text for now; you can hash it later.
        balance: 100000,
      });
      await adminUser.save();
      console.log('Admin user created.');
    } else {
      console.log('Admin user already exists.');
    }

    // Check and create testuser
    const testUserExists = await User.findOne({ username: 'testuser' });
    if (!testUserExists) {
      const testUser = new User({
        username: 'testuser',
        password: '1234', // Use plain text for now; you can hash it later.
        balance: 5000,
      });
      await testUser.save();
      console.log('Test user created.');
    } else {
      console.log('Test user already exists.');
    }

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error creating default users:', err.message);
    mongoose.connection.close(); // Ensure connection closes even on errors
  }
};

createDefaultUsers();
