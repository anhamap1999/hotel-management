const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');
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

router.use(handleError);
module.exports = router;
