const express = require('express');

const { accessValidations } = require('../middleware/verifyToken.js');
const userController = require('../controller/users.js');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/getAllUsers', accessValidations, userController.getAllUsers);
router.patch('/update/:email', accessValidations, userController.updateUser);
router.post('/login', userController.login);

module.exports = router;