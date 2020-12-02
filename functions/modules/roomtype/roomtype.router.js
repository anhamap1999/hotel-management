const express = require('express');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');

const router = express.Router();
const {
  createType,
  getRoomTypes,
  deleteType,
  updateType,
} = require('./roomtype.controller');

// router.use(isAuth);

router.get('/', getRoomTypes);
router.delete('/delete/:id', deleteType);
router.post('/create', createType);
router.put('/update/:id', updateType);

router.use(handleError);
module.exports = router;
