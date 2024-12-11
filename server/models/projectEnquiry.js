const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectEnquirySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        required: true,
    },
    bhkPreference: {
        type: String,
        required: true,
    },
    budgetRange: {
        type: String,
        required: true,
    },
    locationPreference: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true,
    },
    isViewed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

projectEnquirySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProjectEnquiry', projectEnquirySchema);
