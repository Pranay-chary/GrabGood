const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const User = require('../models/User');
require('dotenv').config();

const mockNotifications = [
  {
    title: "Welcome to GrabGood",
    message: "Thank you for joining our platform. We're excited to have you!",
    type: "SYSTEM_ANNOUNCEMENT",
  },
  {
    title: "New Booking Request",
    message: "You have received a new booking request for your venue",
    type: "BOOKING_UPDATE",
  },
  {
    title: "Surplus Food Alert",
    message: "New surplus food is available in your area",
    type: "SURPLUS_FOOD_ALERT",
  },
  {
    title: "Account Update",
    message: "Your account details have been updated successfully",
    type: "OTHER",
  }
];

async function addMockNotifications() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Get first user from the database
    const user = await User.findOne();
    
    if (!user) {
      console.error('No users found in the database!');
      process.exit(1);
    }
    
    console.log(`Using user: ${user.name} (${user._id})`);
    console.log('User object:', JSON.stringify(user));
    
    // Delete existing notifications for this user
    await Notification.deleteMany({ userId: user._id });
    console.log('Cleared existing notifications');
    
    // Create mock notifications
    const createdNotifications = await Promise.all(
      mockNotifications.map(async (notification) => {
        const notificationDoc = new Notification({
          userId: user._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          read: false,
          actionUrl: '/dashboard',
        });
        
        console.log('Created notification:', JSON.stringify(notificationDoc));
        return await notificationDoc.save();
      })
    );
    
    console.log(`Created ${createdNotifications.length} notifications`);
    
    // Verify the notifications were created correctly
    const allNotifications = await Notification.find({ userId: user._id });
    console.log(`Found ${allNotifications.length} notifications in the database`);
    
    // Test the query used in the controller
    const testQuery = { userId: user._id.toString() };
    console.log('Testing query:', JSON.stringify(testQuery));
    const testResult = await Notification.find(testQuery);
    console.log(`Test query found ${testResult.length} notifications`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (error) {
    console.error('Error adding mock notifications:', error);
  }
}

addMockNotifications(); 