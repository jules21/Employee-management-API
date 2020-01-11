// @desc    get all employees
// @route   GET /api/v1/employees
// @access  Public
exports.getEmployees = (req, res, next) => {
	res.status('200').json({ success: true, data: 'get all employees' });
};

// @desc    get single employee
// @route   GET /api/v1/employees/:id
// @access  Public
exports.getEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'get single employee' });
};

// @desc    get single employee
// @route   POST /api/v1/employees/
// @access  Private
exports.createEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'create employee' });
};

// @desc    update employee
// @route   PUT /api/v1/employees/:id
// @access  Private
exports.updateEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'update employee' });
};

// @desc    activate employee
// @route   PUT /api/v1/employees/:id/activate
// @access  Private
exports.activateEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'activate employee' });
};

// @desc    suspend employee
// @route   PUT /api/v1/employees/:id/suspend
// @access  Private
exports.suspendEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'suspend employee' });
};

// @desc    update employee
// @route   DELETE /api/v1/employees/:id
// @access  Private
exports.deleteEmployee = (req, res, next) => {
	res.status('200').json({ success: true, data: 'delete employee' });
};
