/** @format */

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("🔄 Trying to connect MongoDB...");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", conn.connection.name);
    console.log("Host:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;
