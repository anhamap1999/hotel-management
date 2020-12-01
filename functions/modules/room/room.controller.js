const Room = require('../../models/room');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');
const RoomType = require('../../models/roomType');

exports.getRooms = async (req, res, next) => {
  try {
    const { select, sort, type_id, rest } = req.query;
    if (type_id) {
      const roomType = await RoomType.findById(type_id);
      if (!roomType) {
        throw new Error({
          statusCode: 400,
          message: 'roomType.notFound',
          error: 'room type not found',
        });
      }
    }
    const rooms = await Room.find({ rest })
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const success = new Success({ data: rooms });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    const success = new Success({ data: room });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};
exports.createRooms = async (req, res, next) => {
  try {
    const rooms = req.body;
    const createRoomPromises = rooms.map((item) => {
      const room = new Room(item);
      return room.save();
    });
    const result = await Promise.all(createRoomPromises);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};
exports.updateType = async (req, res, next) => {};
exports.deleteType = async (req, res, next) => {};
