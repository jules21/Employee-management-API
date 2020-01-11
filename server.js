const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// Route files
const employees = require('./routes/employees');

const app = express();

// Body parser
app.use(express.json());

// logging middleware
app.use(logger);
// mount routers
app.use('/api/v1/employees/', employees);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
});

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error found: ${err.message}`.red);

	server.close(() => process.exit(1));
});
