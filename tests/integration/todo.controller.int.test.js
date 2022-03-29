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

    it('handle errors', async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({})
            .expect(500);

        expect(response.body.message).toBeDefined();
        expect(response.body).toStrictEqual({
            message: 'Todo validation failed: title: Path `title` is required.'
        });
    })
});