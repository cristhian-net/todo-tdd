const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    done: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = Mongoose.model('Todo', TodoSchema);