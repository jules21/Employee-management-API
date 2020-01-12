# Employee Management API
> Backend API for Employee Management System implemented in Node.js and MongoDB

## Usage

Rename "config/config.env.env" to "config/config.env" and change settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in development mode
npm run dev

#run in production mode
npm start
```

## Features
### Achieved
#### Manage Employees
- Manager is able to create employee bypassing required data
- the system send a communication email to new employee joined company
- Manager is able to view single or all employee added in system
- Manager is able to delete or update employee in system
- Manager is able to change employees' status by activate or suspend them
- manager is able to search for an employee based on his position, name, email or phone number.

#### Authentication
- Manager should signup by providing his/her employee name, national id number, phone number, email, date of birth, status and position.
-  Manager is able to log in and receive a JWT token
- Manager can Reset the password by providing an email address to which a password reset link will be sent
- User should be able to log in with the new password.

### Not Achieved
- The system should record all the manager’s activities
- A manager should be able to upload an excel sheet containing a list of his/her employees 
- Account verification 

## Demo

The API is live at [Employee Management System](https://employee-mgmt.herokuapp.com/)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/6413036/SWLiYkU7)

- Version: 1.0.0
- License: MIT
- Author: Jules Fabien