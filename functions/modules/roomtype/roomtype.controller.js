const RoomType = require('../../models/roomType');
const Room = require('../../models/room');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');

exports.getRoomTypes = async (req, res, next) => {
  try {
    const { select, sort } = req.query;
    const types = await RoomType.find({})
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const success = new Success({ data: types });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.createType = async (req, res, next) => {
  try {
    const type = new RoomType(req.body);
    const result = await type.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.updateType = async (req, res, next) => {
  try {
    const type = await RoomType.findById(req.params.id);
    if (!type) {
      throw new Error({
        statusCode: 400,
        message: 'roomType.notFound',
        error: 'room type not found',
      });
    }
    await RoomType.findByIdAndUpdate(req.params.id, req.body);
    const updatedType = await RoomType.findById(req.params.id);
    const success = new Success({ data: updatedType });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.deleteType = async (req, res, next) => {
  try {
    const type = await RoomType.findById(req.params.id);
    if (!type) {
      throw new Error({
        statusCode: 400,
        message: 'roomType.notFound',
        error: 'room type not found',
      });
    }
    const rooms = await Room.find({ room_type_id: req.params.id });
    if (rooms.length > 0) {
      throw new Error({
        statusCode: 400,
        message: 'roomType.canNotDelete',
        error: 'room type is type of some rooms',
      });
    }
    await RoomType.findByIdAndRemove(req.params.id);
    const success = new Success({ data: type });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
