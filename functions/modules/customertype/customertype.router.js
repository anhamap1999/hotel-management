const express = require('express');

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
module.exports = router;
