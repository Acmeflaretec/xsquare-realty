const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },    
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  homeLoan: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  is_verified: {
    type: Boolean,
    default: true,
  },
});
contactSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Contact', contactSchema);
