const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room_type_id: { type: String, required: true },
  room_type: { type: mongoose.SchemaTypes.ObjectId, ref: 'RoomType' },
  note: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['available', 'busy', 'unavailable', 'reserved'],
    default: 'available',
  },
  created_at: { type: Date, default: Date.now(), required: true },
});
const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
