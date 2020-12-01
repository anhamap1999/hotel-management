const Booking = require('./../../models/booking');
const Customer = require('./../../models/customer');

const { Error } = require('./../../utils/Error');
const { Success } = require('./../../utils/Success');
exports.create = async (req, res, next) => {
  try {
    const { room_id, user_ids, total } = req.body;
    const newBooking = new Booking({
      room_id,
      user_ids,
    });
    const result = await newBooking.save();
    res.send(new Success({ data: result })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookingList = await Booking.find();
    res.send(new Success({ data: bookingList })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookingFound = await Booking.findById(id);
    if (!bookingFound) {
      throw new Error({ statusCode: 404, message: 'Booking not found!' });
    }
    res.send(new Success({ data: bookingFound })).status(200);
  } catch (error) {
    () => next(error);
  }
};
