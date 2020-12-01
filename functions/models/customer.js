const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customer_type_id: { type: String, required: true },
  address: { type: String, required: true },
  id_number: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;
