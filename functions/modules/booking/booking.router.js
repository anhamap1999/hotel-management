const express = require('express');
const { handleError } = require('./../../middlewares/error.middleware');

const router = express.Router();
const {
  create,
  getAllBookings,
  getBookingById,
} = require('./booking.controller');

router.post('/create', create);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.use(handleError);

module.exports = router;
