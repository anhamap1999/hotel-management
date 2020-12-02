const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');
const { register, updateUser, changePassword } = require('./user.controller');

router.post('/register', register);
router.patch('/update', isAuth, updateUser);
router.patch('/change-password', isAuth, changePassword);

router.use(handleError);

module.exports = router;
