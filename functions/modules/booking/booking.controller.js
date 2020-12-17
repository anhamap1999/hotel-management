const Booking = require('./../../models/booking');
const Customer = require('./../../models/customer');
const Room = require('./../../models/room');
const { Error } = require('./../../utils/Error');
const { Success } = require('./../../utils/Success');
exports.create = async (req, res, next) => {
  try {
    const { room_id, customers } = req.body;

    const room = await Room.findById(room_id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    if (room.status !== 'available') {
      throw new Error({
        statusCode: 400,
        message: 'room.isNotAvailable',
        error: 'room is not available to book',
      });
    }
    if (!customers.length) {
      throw new Error({
        statusCode: 400,
        message: 'booking.customersEmpty',
        error: 'customers are empty',
      });
    }
    await Room.findByIdAndUpdate(room_id, { status: 'busy' });
    const newBooking = new Booking({
      room_id,
      customers,
      room: room_id
    });
    const result = await newBooking.save();
    res.send(new Success({ data: result })).status(200);
  } catch (error) {
    return next(error);
  }
};
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookingList = await Booking.find(req.query).sort('-created_at').populate('room');
    res.send(new Success({ data: bookingList })).status(200);
  } catch (error) {
    return next(error);
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
    return next(error);
  }
};
