const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  booking_ids: { type: Array, required: true },
  bookings: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Booking' }],
  created_at: { type: Date, default: Date.now(), required: true }
});
const billModel = mongoose.model('Bill', billSchema);
module.exports = billModel;
