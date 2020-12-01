const express = require('express');

const router = express.Router();
const { create, getAllBills, getBillById } = require('./bill.controller');

router.post('/create', create);
router.get('/', getAllBills);
router.get('/:id', getBillById);
module.exports = router;
