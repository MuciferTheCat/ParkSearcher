const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const parkingRoutes = require('./routes/parkingRoutes');

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/parking', parkingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});