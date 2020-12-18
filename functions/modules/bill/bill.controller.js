const Bill = require('./../../models/bill');
const Booking = require('./../../models/booking');
const Config = require('./../../models/config');
const Customer = require('./../../models/customer');
const RoomType = require('./../../models/roomType');
const Room = require('./../../models/room');
const { Error } = require('./../../utils/Error');
const { Success } = require('./../../utils/Success');
const moment = require('moment');

exports.create = async (req, res, next) => {
  try {
    const { customer_id, booking_ids } = req.body;
    const newBill = new Bill({
      customer_id,
      booking_ids,
      bookings: booking_ids,
    });

    if (!booking_ids.length) {
      throw new Error({
        statusCode: 400,
        message: 'bill.bookingEmpty',
        error: 'bookings are empty',
      })
    }

    if (!customer_id) {
      throw new Error({
        statusCode: 400,
        message: 'bill.customerEmpty',
        error: 'customer is empty',
      })
    }

    const configs = await Config.find({});
    const max_qti_of_customers = configs.find(
      (item) => item.name === 'max_qti_of_customers'
    );
    const max_qti_of_customers_rate = configs.find(
      (item) => item.name === 'max_qti_of_customers_rate'
    );
    const customer_type_config = configs.find(
      (item) => item.name === 'customer_type_config'
    );

    let total_fee = 0;

    booking_ids.forEach(async (item) => {
      const booking = await Booking.findById(item);
      const { room_id, customers, date, created_at } = booking;

      const room = await Room.findById(room_id);
      const type = await RoomType.findById(room.room_type_id);

      const period = moment().diff(moment(created_at), 'minutes');
      const dates = Math.ceil(period / 1440);
      let fee = dates * type.price;

      if (customers.length >= max_qti_of_customers.value) {
        fee += fee * max_qti_of_customers_rate.value;
      }

      const customer_type_qti = {};
      customers.map(async (customer) => {
        if (!customer_type_qti[customer.type_id]) {
          customer_type_qti[customer.type_id] = 1;
        } else customer_type_qti[customer.type_id]++;
      });

      customer_type_config.value.forEach((config) => {
        if (customer_type_qti[config.id] >= config.qti) {
          fee = fee * config.rate;
        }
      });

      booking.total = fee;
      room.status = 'available';
      await Booking.findByIdAndUpdate(item, booking);
      await Room.findByIdAndUpdate(room_id, room);
      const customerPromises = customers.map(i => Customer.findByIdAndUpdate(i.id, { status: 'available' }));
      await Promise.all(customerPromises);
      total_fee += fee;
    });
    const result = await newBill.save();
    const bill = await Bill.find({_id: result._id}).populate({ path: 'bookings', populate: { path: 'bookings '}});
    // const result = [];
    result.total_fee = total_fee;
    res.send(new Success({ data: bill.length ? bill[0] : result })).status(200);
  } catch (error) {
    return next(error);
  }
};
exports.getAllBills = async (req, res, next) => {
  try {
    const { start_time, end_time, sort } = req.query;
    const billList = await Bill.find({ created_at: { $gte: start_time, $lte: end_time }}).populate({
      path: 'bookings',
      populate: { path: 'bookings' },
    }).sort(sort ? sort : '-created_at');
    res.send(new Success({ data: billList })).status(200);
  } catch (error) {
    return next(error);
  }
};
exports.getBillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const billFound = await Bill.find({_id: id}).populate({ path: 'bookings', populate: { path: 'bookings '}});
    if (!billFound.length) {
      throw new Error({ statusCode: 404, message: 'Bill not found!' });
    }
    res.send(new Success({ data: billFound[0] })).status(200);
  } catch (error) {
    return next(error);
  }
};

exports.calculateFee = async (req, res, next) => {
  try {
    const configs = await Config.find({});
    const max_qti_of_customers = configs.find(
      (item) => item.name === 'max_qti_of_customers'
    );
    const max_qti_of_customers_rate = configs.find(
      (item) => item.name === 'max_qti_of_customers_rate'
    );
    const customer_type_config = configs.find(
      (item) => item.name === 'customer_type_config'
    );

    const booking = await Booking.findById(req.params.id);
    const { room_id, customers, date, created_at } = booking;

    const room = await Room.findById(room_id);
    const type = await RoomType.findById(room.room_type_id);

    const period = moment().diff(moment(created_at), 'minutes');
    const dates = Math.ceil(period / 1440);
    let fee = dates * type.price;

    if (customers.length >= max_qti_of_customers.value) {
      fee += fee * max_qti_of_customers_rate.value;
    }

    const customer_type_qti = {};
    customers.map(async (customer) => {
      if (!customer_type_qti[customer.type_id]) {
        customer_type_qti[customer.type_id] = 1;
      } else customer_type_qti[customer.type_id]++;
    });

    customer_type_config.value.forEach((config) => {
      if (customer_type_qti[config.id] >= config.qti) {
        fee = fee * config.rate;
      }
    });

    const result = { dates, fee };
    res.send(new Success({ data: result })).status(200);
  } catch (error) {
    return next(error);
  }
};
