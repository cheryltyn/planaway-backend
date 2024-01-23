// for more robust and better error handling
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    // debugging and troubleshooting
    mongoose.set("debug", true);
    // use this only when have specific need for flexible queries
    //mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.DATABASE_URL);

    // Logging more detailed information about the connection
    console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
