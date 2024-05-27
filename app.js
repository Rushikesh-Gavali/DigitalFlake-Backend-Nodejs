const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middlewares/errorHandler');
const helmet = require('helmet');
const cors = require('cors');
const responseFormatter=require('./src/middlewares/responseFormatter');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(responseFormatter);

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/states', require('./src/routes/stateRoutes'));
app.use('/api/cities', require('./src/routes/cityRoutes'));
app.use('/api/warehouses', require('./src/routes/warehouseRoutes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
