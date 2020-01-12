const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employee');
const sendEmail = require('../utils/sendEmail');
// @desc    get all employees
// @route   GET /api/v1/employees
// @access  Public
exports.searchEmployee = asyncHandler(async (req, res, next) => {
	const employees = await Employee.find(req.body);
	res.status('200').json({ success: true, count: employees.length, data: employees });
});
// @desc    get all employees
// @route   GET /api/v1/employees
// @access  Public
exports.getEmployees = asyncHandler(async (req, res, next) => {
	const employees = await Employee.find();
	res.status('200').json({ success: true, count: employees.length, data: employees });
});

// @desc    get single employee
// @route   GET /api/v1/employees/:id
// @access  Public
exports.getEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findById(req.params.id);
	if (!employee) {
		return next(new ErrorResponse(`resource not found with id ${req.params.id}`));
	}
	res.status('200').json({ success: true, data: employee });
});

// @desc    get single employee
// @route   POST /api/v1/employees/
// @access  Private
exports.createEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.create(req.body);
	const message = `
		<p>Welcome ${employee.names},</p> 
		<p>We are very happy to have you join our organization. I hope you are ready to fall in love with your new job and meet your new colleagues.</p>
		<p>If you have any questions, we will be happy to answer. Please don’t hesitate to contact us by email or phone. <br>
		Again, congratulations. We are thrilled to you have you join the team and look forward to meeting you!</p>
		<br><br>
		Regards,`;

	try {
		await sendEmail({
			email: employee.email,
			subject: 'Welcome to [company name]!',
			message
		});

		res.status('201').json({ success: true, data: employee });
	} catch (err) {
		return next(new ErrorResponse('User created but Email failed to be sent', 500));
	}
});

// @desc    update employee
// @route   PUT /api/v1/employees/:id
// @access  Private
exports.updateEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query'
	});
	if (!employee) {
		return next(new ErrorResponse(`resource not found with id ${req.params.id}`));
	}
	res.status('200').json({ success: true, data: employee });
});

// @desc    activate employee
// @route   PUT /api/v1/employees/:id/activate
// @access  Private
exports.activateEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findByIdAndUpdate(
		req.params.id,
		{ status: 'active' },
		{
			new: true,
			runValidators: true
		}
	);
	if (!employee) {
		return next(new ErrorResponse(`resource not found with id ${req.params.id}`));
	}
	res.status('200').json({ success: true, data: employee });
});

// @desc    suspend employee
// @route   PUT /api/v1/employees/:id/suspend
// @access  Private
exports.suspendEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findByIdAndUpdate(
		req.params.id,
		{ status: 'inactive' },
		{
			new: true,
			runValidators: true
		}
	);
	if (!employee) {
		return next(new ErrorResponse(`resource not found with id ${req.params.id}`));
	}
	res.status('200').json({ success: true, data: employee });
});

// @desc    update employee
// @route   DELETE /api/v1/employees/:id
// @access  Private
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findByIdAndDelete(req.params.id);
	if (!employee) {
		return next(new ErrorResponse(`resource not found with id ${req.params.id}`));
	}
	res.status('200').json({ success: true, data: '' });
});
