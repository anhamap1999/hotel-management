const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');

const router = express.Router();
const { create, getAllBills, getBillById, calculateFee } = require('./bill.controller');

router.post('/create', create);
router.get('/', getAllBills);
router.get('/:id', getBillById);
router.get('/calculate-fee/:id', calculateFee);
router.use(handleError);

module.exports = router;
