const TodoModel = require('../models/todo.model');

const createTodo = async (req, res, next) => {
    const {title, done} = req.body;
    try {
        const createdTodo = await TodoModel.create({title, done});
        res.status(201).json(createdTodo);
    } catch(err) {
        next(err);
    }
}

const getTodos = async (req, res, next) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    createTodo,
    getTodos,
}