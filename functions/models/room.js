const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room_type_id: { type: String, required: true },
  note: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['available', 'busy', 'reserved', 'unavailable'],
    default: 'available',
  },
  created_at: { type: Date, default: Date.now(), required: true }
});
const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
