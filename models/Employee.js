const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const uniqueValidator = require('mongoose-unique-validator');

const EmployeeSchema = new mongoose.Schema({
	names: {
		type: String,
		required: [ 'true', 'please add an employee name' ]
	},
	nationalId: {
		type: Number,
		unique: true,
		match: [ /^[0-9]{16}$/, 'national id must be 16 numbers' ],
		required: [ true, 'please add a national Id' ]
	},
	phoneNumber: {
		type: Number,
		unique: true,
		match: [ /^((072)|(078)|(073)){1}[0-9]{7}$/, 'please add valid phone number[Rwandan number].' ],
		required: [ true, 'please add a phone number' ]
	},
	email: {
		type: String,
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ],
		required: [ true, 'Please add an email' ]
	},
	dateOfBirth: {
		type: Date,
		required: [ true, 'please add Date of birth' ]
	},
	status: {
		type: String,
		enum: [ 'active', 'inactive' ],
		required: true
	},
	position: {
		type: String,
		enum: [ 'Manager', 'developer', 'designer', 'other' ],
		required: true
	}
});
// Apply the uniqueValidator plugin to userSchema.
EmployeeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique. {VALUE} is already taken ' });

EmployeeSchema.post('save', function(doc) {
	// console.log('%s has been saved', doc._id);
	// create reusable transporter object using the default SMTP transport
	let transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_HOST,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD
		}
	});
	const message = {
		from: 'non-reply@company-name.com', // Sender address
		to: `${doc.email}`, // List of recipients
		subject: 'Welcome to [company name]!', // Subject line
		html: `<p>Welcome ${doc.names},</p> 
		<p>We are very happy to have you join our organization. I hope you are ready to fall in love with your new job and meet your new colleagues.</p>
		<p>If you have any questions, we will be happy to answer. Please don’t hesitate to contact us by email or phone. <br>
		Again, congratulations. We are thrilled to you have you join the team and look forward to meeting you!</p>
		<br><br>
		Regards,`
	};
	transport.sendMail(message, function(err, info) {
		if (err) {
			console.log(err);
		}
	});
});

module.exports = mongoose.model('employees', EmployeeSchema);
