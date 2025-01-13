const express = require('express');
const cookies = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require("swagger-ui-express");
const fs = require("fs")
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

app.use(cookies())

connectDB();

const checkDatabaseConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return "CONNECTED";
    }
  } catch (err) {
    return "DISCONNECTED";
  }
};

app.get("/health", async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  const status = dbStatus === "CONNECTED" ? "UP" : "DOWN";

  res.status(status === "UP" ? 200 : 500).json({
    status,
    service: "UserService",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/user', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("api/user", (req, res) => {
  res.send("User endpoint is working!");
});

var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy;
var opts = {}
var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    console.log(req.cookies)
    token = req.cookies['jwt'];
  }
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  if (jwt_payload) {
    return done(null, jwt_payload)
  } else {
    return done(null, false)
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});