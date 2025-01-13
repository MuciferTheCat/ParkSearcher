const express = require('express');
const cookies = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require("swagger-ui-express");
const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

app.use(cookies())

connectDB();

const createAdminUser = async () => {
  try {
      const adminEmail = 'admin2@example.com';
      const adminPassword = process.env.ADMIN_PASS || 'admin';

      const existingAdmin = await User.findOne({ email: adminEmail });

      if (!existingAdmin) {
          const adminUser = new User({
              username: 'admin2',
              email: adminEmail,
              password: adminPassword,
              isAdmin: true,
          });

          await adminUser.save();
          console.log('Admin user created successfully.');
      } else {
          console.log('Admin user already exists.');
      }
  } catch (error) {
      console.error('Error creating admin user:', error);
  }
};

connectDB().then(() => {
  console.log('MongoDB Connected');
  createAdminUser();
}).catch(err => {
  console.error('MongoDB Connection Error:', err);
});

app.use('/api/user', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy;
var opts = {}
var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    console.log(req.cookies)
    token = req.cookies['jwt'];
  }
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  if (jwt_payload){
    return done(null, jwt_payload)
  }else{
    return done(null, false)
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});