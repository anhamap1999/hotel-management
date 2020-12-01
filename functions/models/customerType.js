const mongoose = require('mongoose');

const customerTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
const customerTypeModel = mongoose.model('CustomerType', customerTypeSchema);
module.exports = customerTypeModel;
