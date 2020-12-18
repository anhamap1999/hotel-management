const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();
const {
  create,
  getAllBookings,
  getBookingById,
  checkIn
} = require('./booking.controller');

router.post('/create', isAuth, create);
router.get('/', isAuth, getAllBookings);
router.get('/:id', isAuth, getBookingById);
router.patch('/check-in/:id', isAuth, checkIn);
router.use(handleError);

module.exports = router;
