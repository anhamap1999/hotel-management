const Booking = require('./../../models/booking');
const Customer = require('./../../models/customer');
const Room = require('./../../models/room');
const { Error } = require('./../../utils/Error');
const { Success } = require('./../../utils/Success');
exports.create = async (req, res, next) => {
  try {
    const { room_id, customers, is_reserved } = req.body;

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
    
    if (!is_reserved) {
      const customerPromises = customers.map(i => Customer.findByIdAndUpdate(i.id, { status: 'unavailable' }));
      await Promise.all(customerPromises);
    }
    await Room.findByIdAndUpdate(room_id, { status: is_reserved ? 'reserved' : 'busy' });
    const newBooking = new Booking({
      room_id,
      customers,
      room: room_id,
      check_in_at: is_reserved ? null : Date.now(),
      status: is_reserved ? 'reserved' : 'booking'
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

exports.checkIn = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookingFound = await Booking.findById(id);
    if (!bookingFound) {
      throw new Error({ statusCode: 404, message: 'booking.notFound', error: 'booking not found' });
    }
    await Booking.findByIdAndUpdate(id, { status: 'booking', check_in_at: Date.now() });
    const { customers, room_id } = bookingFound;
    
    await Room.findByIdAndUpdate(room_id, { status: 'busy' });
    const customerPromises = customers.map(i => Customer.findByIdAndUpdate(i.id, { status: 'unavailable' }));
    await Promise.all(customerPromises);

    const booking = await Booking.findById(id);
    res.send(new Success({ data: booking })).status(200);
  } catch (error) {
    return next(error);
  }
};
