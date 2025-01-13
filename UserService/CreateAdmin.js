require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

async function addAdmin() {
  try {
    const username = "admin2";
    const password = process.env.ADMIN_PASS || "admin";
    const email = "admin2@example.com";
    const isAdmin = true;

    const new_user = new User({ username, password, email, isAdmin });

    await new_user.save();
    console.log("Admin user created successfully:");
  } catch (error) {
    console.error("Error adding admin user:", error);
  } finally {
    mongoose.connection.close();
  }
}

exports.addAdmin = addAdmin;