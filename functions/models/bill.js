const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  booking_ids: { type: Array, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
const billModel = mongoose.model('Bill', billSchema);
module.exports = billModel;
