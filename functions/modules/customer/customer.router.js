const express = require('express');

const router = express.Router();
const {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} = require('./customer.controller');

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/create', createCustomer);
router.patch('/update/:id', updateCustomer);
router.delete(':id', deleteCustomer);
module.exports = router;
