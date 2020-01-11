const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employee');
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
	res.status('200').json({ success: true, data: employee });
});

// @desc    update employee
// @route   PUT /api/v1/employees/:id
// @access  Private
exports.updateEmployee = asyncHandler(async (req, res, next) => {
	const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
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
	res.status('200').json({ success: true, data: 'activate employee' });
});

// @desc    suspend employee
// @route   PUT /api/v1/employees/:id/suspend
// @access  Private
exports.suspendEmployee = asyncHandler(async (req, res, next) => {
	res.status('200').json({ success: true, data: 'suspend employee' });
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
