const TodoModel = require('../models/todo.model');

const createTodo = (req, res) => {
    const {title, done} = req.body;
    const createdTodo = TodoModel.create({title, done});
    res.status(201).json(createdTodo);
}

module.exports = {
    createTodo,
}