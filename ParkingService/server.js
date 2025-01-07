const express = require('express');
const cookies = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const parkingRoutes = require('./routes/parkingRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

app.use(cookies())

connectDB();

app.use('/api/parking', parkingRoutes);

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});