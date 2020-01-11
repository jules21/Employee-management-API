// @desc    connect to mongoDB
const mongoose = require('mongoose');
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});
	console.log(`mongodb connected on ${conn.connection.host}`);
};

module.exports = connectDB;
