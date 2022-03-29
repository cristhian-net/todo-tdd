const httpMocks = require('node-mocks-http');

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

jest.mock('../../models/todo.model');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    jest.clearAllMocks()
})

describe('TodoController.createTodo', () => {

    beforeEach(() => {
        req.body = newTodo;
    });

    it('should have a createTodo function', () => {
        expect(TodoController.createTodo).toBeDefined();
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call create method on Todo model an return good response', async () => {
        await TodoController.createTodo(req, res);
        expect(TodoModel.create).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(201);
    });
    
    it('should send required title', async () => {
        await TodoController.createTodo(req, res);
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    })

    it('should return json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

    it('should handle errors', async () => {
        const errorMessage = {
            message: 'ValidationError: Todo validation failed: title: Path `title` is required.'
        }
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

describe('TodoController.getTodos', () => {
    it('should return a list of todos', async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res);
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    it('should handle errors', async () => {
        const errorMessage = 'error'
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})

describe('TodoController.getById', () => {
    it('should return todo object', async () => {
        const todo = allTodos[0];
        TodoModel.findById.mockReturnValue(todo);
        await TodoController.getById(req, res);
        expect(res._getJSONData()).toStrictEqual(todo);
    })

    it('should return 404 if no todo is found', async() => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBe(true);
    })
})

describe('TodoController.updateTodo', () => {
    it('should update todo', async () => {
        const todo = allTodos[0];
        req.params.id = todo._id;
        req.body = {
            title: 'new title'
        }
        TodoModel.findByIdAndUpdate.mockReturnValue(todo);
        await TodoController.updateTodo(req, res);
        expect(res._getJSONData()).toStrictEqual(todo);
        expect(res.statusCode).toBe(200);
    })

    it('should return 404 if not found', async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBe(true);
    })

    it('should handle errors', async () => {
        const errorMessage = 'error'
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

describe('TodoController.deleteTodo', () => {
    it('should delete todo', async () => {
        const todo = allTodos[0];
        req.params.id = todo._id;
        TodoModel.findByIdAndRemove.mockReturnValue(todo);
        await TodoController.deleteTodo(req, res);
        expect(res._getJSONData()).toStrictEqual(todo);
        expect(res.statusCode).toBe(200);
    })

    it('should return 404 if item not found', async () => {
        TodoModel.findByIdAndRemove.mockReturnValue(null);
        await TodoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBe(true);
    })

    it('should handle errors', async () => {
        const errorMessage = 'error'
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndRemove.mockReturnValue(rejectedPromise);
        await TodoController.deleteTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})