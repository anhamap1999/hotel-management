const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();
const { create, getAllBills, getBillById, calculateFee } = require('./bill.controller');

router.post('/create', isAuth, create);
router.get('/', isAuth, getAllBills);
router.get('/:id', isAuth, getBillById);
router.get('/calculate-fee/:id', isAuth, calculateFee);
router.use(handleError);

module.exports = router;
