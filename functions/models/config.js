const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});
configSchema.plugin(paginate);
const configModel = mongoose.model('Config', configSchema);
module.exports = configModel;
