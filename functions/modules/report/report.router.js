const express = require('express');
const { handleError } = require('../../middlewares/error.middleware');

const router = express.Router();
const {
  getReport
} = require('./report.controller');

router.get('/', getReport);
router.use(handleError);

module.exports = router;
