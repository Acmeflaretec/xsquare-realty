const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const projectsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    description: {
        type: String,
        required: true
    },
    BuilderDescription: {
        type: String,
        required: true
    },
    ongoing: {
        type: String,
    },
    upcoming: {
        type: String,
    },
    completed: {
        type: String,
    },
    location: {
        type: String,
    },
    
    ExpertOpinions: {
        type: [String]
    },
    configurations: [{
        configuration: String,
        details: String
    }],
    faqs: [{
        questions: String,
        answer: String
    }],
    unit: [{
        unitType: String,
        configurationSize: String
    }],
    Spec: [{
        Specifications: String,
        SpecificationsDetails: String
    }],
    image: {
        type: Array,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },

    reviews: [{
        name: String,
        rating: String,
        review: String,
    }],

},
    {
        timestamps: true
    });


    projectsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Projects', projectsSchema)