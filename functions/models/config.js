const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
const configModel = mongoose.model('Config', configSchema);
module.exports = configModel;
