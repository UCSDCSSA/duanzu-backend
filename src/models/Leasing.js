const mongoose = require('mongoose');

const LeasingSchema = new mongoose.Schema({
   user_id: {
      type: String,
      default: ''
   },
   start_date: {
      type: Date,
      default: Date.now()
   },
   end_date: {
      type: Date,
      default: Date.now()
   },
   complex_id: {
      type: String,
      default: ''
   },
   apt_bedroom_amount: {
      type: String,
      default: ''
   },
   apt_bathroom_amount: {
      type: String,
      default: ''
   },
   room_avail: {
      type: String,
      default: ''
   },
   gender_req: {
      type: String,
      default: ''
   },
   user_description: {
      type: String,
      default: ''
   },
   facility: {
      type: String,
      default: ''
   },
   notice: {
      type: String,
      default: ''
   },
   location: {
      type: String,
      default: ''
   },
   img_url: {
      type: String,
      default: ''
   },
});

module.exports = mongoose.model('Leasing', LeasingSchema);