const express = require('express');
const { handleError } = require('../../middlewares/error.middleware');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();
const {
  getReport
} = require('./report.controller');

router.get('/', isAuth, getReport);
router.use(handleError);

module.exports = router;
