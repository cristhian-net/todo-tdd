const httpMocks = require('node-mocks-http');

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    TodoModel.create.mockClear();
})


describe('TodoController.createTodo', () => {

    beforeEach(() => {
        req.body = newTodo;
    });

    it('should have a createTodo function', () => {
        expect(TodoController.createTodo).toBeDefined();
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call create method on Todo model an return good response', () => {
        TodoController.createTodo(req, res);
        expect(TodoModel.create).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(201);
    });
    
    it('should send required title', () => {
        TodoController.createTodo(req, res);
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    })

    it('should return json body in response', () => {
        TodoModel.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
})