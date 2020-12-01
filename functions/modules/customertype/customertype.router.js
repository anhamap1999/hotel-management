const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');

const router = express.Router();
const {
  createType,
  getCustomerType,
  deleteType,
  updateType,
} = require('./customertype.controller');

router.get('/', getCustomerType);
router.delete('/:id', deleteType);
router.post('/create', createType);
router.patch('/update/:id', updateType);
router.use(handleError);

module.exports = router;
