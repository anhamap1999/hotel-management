const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  booking_id: { type: String, required: true },
  user_ids: { type: Array, required: true },
  total: { type: Number }, 
  created_at: { type: Date, default: Date.now(), required: true }
});
const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
