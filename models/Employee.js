const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	names: {
		type: String,
		required: [ 'true', 'please add an employee name' ]
	},
	nationalId: {
		type: Number,
		required: [ 'true', 'please add a national Id' ],
		unique: true,
		minlength: [ 16, 'national id must be 16 numbers' ],
		maxlength: [ 16, 'national id must be 16 numbers' ]
	},
	phoneNumber: {
		type: Number,
		unique: true,
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
		enum: [ 'Manager', 'Developer', 'Designer', 'Other' ],
		required: true
	}
});
module.exports = mongoose.model('employees', EmployeeSchema);
