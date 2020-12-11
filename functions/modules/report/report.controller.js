const Booking = require('../../models/booking');
const CustomerType = require('../../models/customerType');
const Room = require('../../models/room');
const RoomType = require('../../models/roomType');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const moment = require('moment');
exports.getReport = async (req, res, next) => {
  try {
    const month = moment(req.query.date).format('MM');
    const year = moment(req.query.date).format('YYYY');
    const start = moment([year, month - 1]);
    const end = moment(start).endOf('month');

    const bookingList = await Booking.find({
      created_at: { $gte: start.toISOString(), $lte: end.toISOString() },
      total: { $gte: 0 },
    }).sort('-created_at');

    const room_ids = bookingList.map((item) => item.room_id);

    const rooms = await Room.find({ _id: { $in: room_ids } });
    const roomTypes = await RoomType.find({});
    const revenue = {};
    bookingList.forEach((item) => {
      const index = rooms.findIndex(
        (r) => r._id.toString() === item.room_id.toString()
      );
      const room_type_id = rooms[index] ? rooms[index].room_type_id : '';
      if (!revenue[room_type_id]) {
        revenue[room_type_id] = item.total;
      } else {
        revenue[room_type_id] += item.total;
      }
    });
    const result = roomTypes.map((item) => {
      const { _id, name, price } = item;
      return {
        _id,
        name,
        price,
        revenue: revenue[item._id.toString()]
          ? revenue[item._id.toString()]
          : 0,
      };
    });
    res.send(new Success({ data: result })).status(200);
  } catch (error) {
    return next(error);
  }
};
