const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
    _id: {
        'type': String,
        'default': shortid.generate
      },
    username: {
        type: String,
    },
    exercises: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }, 
}, { versionKey: false });

module.exports = mongoose.model("Exercise", UserSchema);