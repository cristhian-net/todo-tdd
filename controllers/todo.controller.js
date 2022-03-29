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

const getById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const todo = await TodoModel.findById(id);
        if(!todo) {
            res.status(404).json({message: 'Todo not found'});
        } else {
            res.status(200).json(todo);
        }
    } catch(err) {
        next(err);
    }
}

const updateTodo = async (req, res, next) => {
    const {id} = req.params;
    const {title, done} = req.body;
    try {
        const todo = await TodoModel.findByIdAndUpdate(id, {title, done}, {new: true});
        if(!todo) {
            res.status(404).json({message: 'Todo not found'});
        } else {
            res.status(200).json(todo);
        }
    } catch(err) {
        next(err);
    }
}

const deleteTodo = async (req, res, next) => {
    try {
        const {id} = req.params;
        const todo = await TodoModel.findByIdAndRemove(id);
        if(!todo) {
            res.status(404).json({message: 'Todo not found'});
        } else {
            res.status(200).json(todo);
        }
    } catch(err) {
        next(err);
    }
}

module.exports = {
    createTodo,
    getTodos,
    getById,
    updateTodo,
    deleteTodo,
}