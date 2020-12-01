const Room = require('../../models/room');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');
const RoomType = require('../../models/roomType');

exports.getRooms = async (req, res, next) => {
  try {
    const { select, sort, type_id } = req.query;
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
    const rooms = await Room.find({})
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
    const { data } = req.body;
    const createRoomPromises = data.map(async (item) => {
      const roomType = await RoomType.findById(item.room_type_id);
      if (!roomType) {
        throw new Error({
          statusCode: 400,
          message: 'roomType.notFound',
          error: 'room type not found',
        });
      }
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
exports.updateRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    const roomType = await RoomType.findById(req.body.room_type_id);
    if (!roomType) {
      throw new Error({
        statusCode: 400,
        message: 'roomType.notFound',
        error: 'room type not found',
      });
    }
    // room = { ...room._doc, ...req.body };
    await Room.findByIdAndUpdate(req.params.id, room);
    const success = new Success({ data: room });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};

exports.updateStatusRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    room.status = req.body.status;
    await Room.findByIdAndUpdate(req.params.id, room);
    const success = new Success({ data: room });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    if (['busy', 'reserved'].includes(room.status)) {
      throw new Error({
        statusCode: 400,
        message: 'room.canNotDelete',
        error: 'room is busy or reserved',
      });
    }
    await Room.findByIdAndRemove(req.params.id);
    const success = new Success({ data: room });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};
