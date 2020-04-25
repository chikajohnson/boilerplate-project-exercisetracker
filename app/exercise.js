const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    exercises: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Exercise", UserSchema);