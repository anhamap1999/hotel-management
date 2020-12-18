const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();
const {
  createType,
  getCustomerType,
  deleteType,
  updateType,
} = require('./customertype.controller');

router.get('/', isAuth, getCustomerType);
router.delete('/:id', isAuth, deleteType);
router.post('/create', isAuth, createType);
router.patch('/update/:id', isAuth, updateType);
router.use(handleError);

module.exports = router;
