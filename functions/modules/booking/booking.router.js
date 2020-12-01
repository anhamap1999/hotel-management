const express = require('express');

const router = express.Router();
const {
  create,
  getAllBookings,
  getBookingById,
} = require('./booking.controller');

router.post('/create', create);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
module.exports = router;
