const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
const roomTypeModel = mongoose.model('RoomType', roomTypeSchema);
module.exports = roomTypeModel;
