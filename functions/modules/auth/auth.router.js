const express = require('express');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const { login, forgotPassword, resetPassword } = require('./auth.controller');

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/change-password', resetPassword);

router.use(handleError);

module.exports = router;
