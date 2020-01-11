const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars

dotenv.config({ path: './config/config.env' });

// Route files

const employees = require('./routes/employees');

const app = express();

// mount routers
app.use('/api/v1/employees/', employees);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
});
