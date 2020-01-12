const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employee');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @description     registern user
// @route           POST /api/v1/auth/register
// @access          public
exports.register = asyncHandler(async (req, res, next) => {
	req.body.position = 'manager';
	console.log(req.body);

	// create user
	const user = await Employee.create(req.body);

	// create token
	const token = user.getSignedJwtToken();
	res.status(200).json({ success: true, token });
});

// @description     Login user
// @route           POST /api/v1/auth/Login
// @access          public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	// validate data parsed
	if (!email && !password) {
		return next(new ErrorResponse('please enter email and password', 400));
	}
	// check user
	const user = await Employee.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid Credentials', 401));
	}

	// check if password match
	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid Credentials', 401));
	}
	// create token
	const token = user.getSignedJwtToken();
	res.status(200).json({ success: true, token });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await Employee.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no employee with that email', 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		});

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});
// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

	const user = await Employee.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	res.status(statusCode).json({
		success: true,
		token
	});
};
