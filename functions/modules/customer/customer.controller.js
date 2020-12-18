const Customer = require('./../../models/customer');
const { Success } = require('./../..//utils/Success');
const { Error } = require('../../utils/Error');
const Booking = require('./../../models/booking');
const Bill = require('./../../models/bill');
exports.createCustomer = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { name, customer_type_id, address, id_number } = req.body;
    const newCustomer = new Customer({
      name,
      customer_type_id: customer_type_id,
      address,
      id_number,
      customer_type: customer_type_id,
    });
    const result = await newCustomer.save();
    res.send(new Success({ data: result })).status(200);
  } catch (err) {
    return next(err);
  }
};
exports.updateCustomer = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { id } = req.params;
    const customerFound = await Customer.findById(id);
    if (!customerFound) {
      throw new Error({
        statusCode: 404,
        message: 'Customer not found!',
        error: 'customer not found',
      });
    }
    const { name, address, id_number, customer_type_id } = req.body;
    const customerUpdated = await customerFound.updateOne({
      name,
      customer_type_id,
      address,
      id_number,
    });
    res.status(200).send(new Success({ data: customerUpdated }));
  } catch (err) {
    return next(err);
  }
};
exports.deleteCustomer = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { id } = req.params;
    const customerFound = await Customer.findById(id);

    if (!customerFound) {
      throw new Error({
        statusCode: 404,
        message: 'Customer not found!',
        error: 'customer not found',
      });
    }
    if (customerFound.status === 'unavailable') {
      throw new Error({
        statusCode: 404,
        message: 'customer.canNotDelete',
        error: 'customer is unavailable',
      });
    }
    const bills = await Bill.find({ customer_id: id });
    if (bills.length) {
      throw new Error({
        statusCode: 404,
        message: 'customer.canNotDelete',
        error: 'customer is in some bills',
      });
    }
    const bookings = await Booking.find({ customers: { $elemMatch: { id: id }}});
    if (bookings.length) {
      throw new Error({
        statusCode: 404,
        message: 'customer.canNotDelete',
        error: 'customer is in some bookings',
      });
    }
    await Customer.findByIdAndDelete(id);
    res.status(200).send(new Success({ data: customerFound }));
  } catch (error) {
    return next(error);
  }
};
exports.getCustomers = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const customerList = await Customer.find(req.query).populate(
      'customer_type'
    );
    res.status(200).send(new Success({ data: customerList }));
  } catch (error) {
    return next(error);
  }
};
exports.getCustomerById = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { id } = req.params;
    const customerFound = await Customer.findById(id);
    console.log('==============');
    if (!customerFound) {
      throw new Error({
        statusCode: 404,
        message: 'Customer not found!',
        error: 'customer not found',
      });
    }
    res.send(new Success({ data: customerFound })).status(200);
  } catch (error) {
    return next(error);
  }
};