const mongoose = require('mongoose');

const ComplexSchema = new mongoose.Schema({
   ComplexId: {
      type: Number,
      default: -1
   },
   ComplexName: {
      type: String,
      default: ''
   }
});

module.exports = mongoose.model('Complex', ComplexSchema);