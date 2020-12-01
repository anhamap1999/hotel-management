const { Success } = require('../../utils/Success');
const CustomerType = require('./../../models/customerType');
exports.getCustomerType = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const customerTypeList = await CustomerType.find();
    res.send(new Success({ data: customerTypeList })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.createType = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { name } = req.body;
    const newCustomerType = new CustomerType({
      name,
    });
    const newType = await newCustomerType.save();
    res.send(new Success({ data: newType })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.updateType = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { id } = req.params;
    const customerTypeFound = await CustomerType.findById(id);
    if (!customerTypeFound) {
      throw new Error({ statusCode: 404, message: 'Customer type not found!' });
    }
    const { name } = req.body;
    const updatedType = await customerTypeFound.updateOne({
      name,
    });
    res.send(new Success({ data: updatedType })).status(200);
  } catch (error) {
    () => next(error);
  }
};
exports.deleteType = async (req, res, next) => {
  // if (!req.user) {
  //   // res.send(404, 'Unauthorized!');
  //   throw new Error({ statusCode: 404, message: 'Unauthorized' });
  // }
  try {
    const { id } = req.params;
    const customerTypeFound = CustomerType.findById(id);
    if (!customerTypeFound) {
      throw new Error({ statusCode: 404, message: 'Customer type not found!' });
    }
    await CustomerType.findByIdAndRemove(id);
    res.send(200);
  } catch (error) {
    () => next(error);
  }
};
