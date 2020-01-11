const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @description     registern user
// @route           POST /api/v1/auth/register
// @access          public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	// create user
	const user = await User.create({
		name,
		email,
		password
	});
	res.status(200).json({ success: true, token: 'user Registered' });
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
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid Credentials', 401));
	}

	// check if password match
	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid Credentials', 401));
	}

	res.status(200).json({ success: true, token: 'user loggedIn' });
});
