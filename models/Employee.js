const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const uniqueValidator = require('mongoose-unique-validator');

const EmployeeSchema = new mongoose.Schema({
	names: {
		type: String,
		required: [ 'true', 'please add an employee name' ]
	},
	nationalId: {
		type: String,
		unique: true,
		match: [ /^((119)|(112)){1}[0-9]{13}$/, 'please add valid national id[Rwandan]' ],
		required: [ true, 'please add a national Id' ]
	},
	phoneNumber: {
		type: String,
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
		required: [ true, 'please add Date of birth' ],
		max: [ '2002-01-15', 'must be above 18 years old' ]
	},
	status: {
		type: String,
		enum: [ 'active', 'inactive' ],
		required: true
	},
	position: {
		type: String,
		enum: [ 'manager', 'developer', 'designer', 'other' ],
		required: true
	},
	password: {
		type: String,
		minlength: 6,
		select: false
	},
	resetPasswordToken: {
		type: String,
		select: false
	},
	resetPasswordExpire: {
		type: Date,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
// Apply the uniqueValidator plugin to Schema.
EmployeeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique. {VALUE} is already taken ' });

EmployeeSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
EmployeeSchema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

EmployeeSchema.methods.matchPassword = async function(enteredPasword) {
	return await bcrypt.compare(enteredPasword, this.password);
};

// Generate and hash password token
EmployeeSchema.methods.getResetPasswordToken = function() {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('employees', EmployeeSchema);
