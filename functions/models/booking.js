const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type_id: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema({
  // date: { type: String, required: true },
  room_id: { type: String, required: true },
  room: { type: mongoose.SchemaTypes.ObjectId, ref: 'Room' },
  customers: { type: [customerSchema], required: true },
  total: { type: Number, default: 0, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
});
const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
