const express = require('express');
const cookies = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');
const swaggerUi = require("swagger-ui-express");
const fs = require("fs")
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

app.use(cookies())

app.use('/api/search', searchRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/health', (req, res) => {
  const healthcheck = {
    status: 'up',
    timestamp: new Date(),
    service: 'SearchService',
    uptime: process.uptime()
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.status = 'down';
    healthcheck.error = error;
    res.status(503).json(healthcheck);
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});