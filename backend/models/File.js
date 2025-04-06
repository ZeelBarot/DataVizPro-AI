const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  data: [{}],
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
