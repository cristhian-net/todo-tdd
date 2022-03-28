const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = '/api/todos';

describe(endpointUrl, () => {
    it('POST ' + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo)
            .expect(201);

        expect(response.body.title).toStrictEqual(newTodo.title);
        expect(response.body.done).toStrictEqual(newTodo.done);
    })
});