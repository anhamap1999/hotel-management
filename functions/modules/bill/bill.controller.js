const Bill = require('./../../models/bill');
const { Error } = require('./../../utils/Error');
const { Success } = require('./../../utils/Success');
exports.create = async (req, res, next) => {
  try {
    const { user_id, booking_ids } = req.body;
    const newBill = new Bill({
      user_id,
      booking_ids,
    });
    const result = await newBill.save();
    res.send(new Success({ data: result })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.getAllBills = async (req, res, next) => {
  try {
    const billList = await Bill.find();
    res.send(new Success({ data: billList })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.getBillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const billFound = Bill.findById(id);
    if (!billFound) {
      throw new Error({ statusCode: 404, message: 'Bill not found!' });
    }
    res.send(new Success({ data: billFound })).status(200);
  } catch (error) {
    () => next(error);
  }
};
