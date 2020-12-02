const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');
const { register, updateUser, changePassword, getUser } = require('./user.controller');

router.post('/register', register);
router.patch('/update', isAuth, updateUser);
router.patch('/change-password', isAuth, changePassword);
router.get('/', isAuth, getUser);

router.use(handleError);

module.exports = router;
