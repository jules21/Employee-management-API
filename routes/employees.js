const express = require('express');
const Router = express.Router();
const {
	getEmployee,
	getEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	activateEmployee,
	suspendEmployee
} = require('../controllers/employees');

Router.route('/').get(getEmployees).post(createEmployee);
Router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

Router.put('/:id/suspend', suspendEmployee);
Router.put('/:id/activate', activateEmployee);

module.exports = Router;
