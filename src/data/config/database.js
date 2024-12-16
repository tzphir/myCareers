const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    // Database URI (From MongoDB Atlas)
    const uri = "mongodb+srv://shushihuang:xWIk0b1SRWOR1PYU@mycareers.1eh0t.mongodb.net/myCareers";
    await mongoose.connect(uri);

    console.log("Connected to myCareers' server");
  } catch (error) {
    console.error("Error connecting to myCareers' server:", error);
    process.exit(1);
  }
};

// Export database connection 
module.exports = connectToDatabase;