const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room_type_id: { type: String, required: true },
  note: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['Còn trống', 'Đã đặt', 'Đang sửa chữa'],
    default: 'Còn trống',
  },
  created_at: { type: Date, default: Date.now(), required: true },
});
const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
