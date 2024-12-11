const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const buildersSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    projects: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Projects"
    },
    description: {
        type: String,
        required: true
    },
    // BuilderDescription: {
    //     type: String,
    //     required: true
    // },
    // ongoing: {
    //     type: String,
    // },
    // upcoming: {
    //     type: String,
    // },
    // completed: {
    //     type: String,
    // },
    // location: {
    //     type: String,
    // },
    
    // ExpertOpinions: {
    //     type: [String]
    // },
    // configurations: [{
    //     configuration: String,
    //     details: String
    // }],
    // unit: [{
    //     unitType: String,
    //     configurationSize: String
    // }],
    // Spec: [{
    //     Specifications: String,
    //     SpecificationsDetails: String
    // }],
    faqs: [{
        questions: String,
        answer: String
    }],
    image: {
        type: Array,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },

    address: [{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        phone: String,
    }],
    reviews: [{
        name: String,
        rating: String,
        review: String,
    }],

},
    {
        timestamps: true
    });


    buildersSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Builders', buildersSchema)