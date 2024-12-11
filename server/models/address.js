const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    emirate: {
        type: String,
        enum: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
        required: true
    },
    area: {
        type: String,
        required: true
    },
    address_line_1: {
        type: String,
        required: true
    },
    address_line_2: {
        type: String,
    },
    landmark: {
        type: String,
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["home", "office"],
        default: "home",
    },
    primary: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Address', addressSchema)