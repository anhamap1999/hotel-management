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

router.get('/', isAuth, getRoomTypes);
router.delete('/delete/:id', isAuth, deleteType);
router.post('/create', isAuth, createType);
router.patch('/update/:id', isAuth, updateType);

router.use(handleError);
module.exports = router;
