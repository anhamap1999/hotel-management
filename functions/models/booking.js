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
  check_in_at: { type: Date, required: false },
  is_reserved: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now(), required: true },
  status: { type: String, required: true, default: 'booking', enum: ['booking', 'reserved']}
});
const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
