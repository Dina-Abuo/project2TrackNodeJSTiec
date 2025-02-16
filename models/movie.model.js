const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Movie', MovieSchema); 
