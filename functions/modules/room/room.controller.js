const Room = require('../../models/room');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');
const RoomType = require('../../models/roomType');

exports.getRooms = async (req, res, next) => {
  try {
    const { select, sort, type_id, status } = req.query;
    const query = {};
    if (type_id) {
      const roomType = await RoomType.findById(type_id);
      if (!roomType) {
        throw new Error({
          statusCode: 400,
          message: 'roomType.notFound',
          error: 'room type not found',
        });
      }
      query.room_type_id = type_id;
    }

    if (status) {
      query.status = status;
    }
    const rooms = await Room.find(query)
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const success = new Success({ data: rooms });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
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
    return next(error);
  }
};
exports.createRooms = async (req, res, next) => {
  try {
    const { data } = req.body;
    const createRoomPromises = data.map(async (item) => {
      const { name, room_type_id, note } = item;
      const roomType = await RoomType.findById(room_type_id);
      if (!roomType) {
        throw new Error({
          statusCode: 400,
          message: 'roomType.notFound',
          error: 'room type not found',
        });
      }
      const room = new Room({
        name,
        room_type_id,
        note,
        room_type: room_type_id,
      });
      return await room.save();
    });
    const result = await Promise.all(createRoomPromises);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new Error({
        statusCode: 400,
        message: 'room.notFound',
        error: 'room not found',
      });
    }
    if (req.body.room_type_id) {
      const roomType = await RoomType.findById(req.body.room_type_id);
      if (!roomType) {
        throw new Error({
          statusCode: 400,
          message: 'roomType.notFound',
          error: 'room type not found',
        });
      }
    }
    await Room.findByIdAndUpdate(req.params.id, req.body);
    const updatedRoom = await Room.findById(req.params.id);
    const success = new Success({ data: updatedRoom });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
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
    await Room.findByIdAndUpdate(req.params.id, req.body);
    const updatedRoom = await Room.findById(req.params.id);
    const success = new Success({ data: updatedRoom });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
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
    return next(error);
  }
};
