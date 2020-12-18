const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const router = express.Router();
const {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} = require('./customer.controller');

router.get('/', isAuth, getCustomers);
router.get('/:id', isAuth, getCustomerById);
router.post('/create', isAuth, createCustomer);
router.patch('/update/:id', isAuth, updateCustomer);
router.delete('/:id', isAuth, deleteCustomer);

router.use(handleError);
module.exports = router;
