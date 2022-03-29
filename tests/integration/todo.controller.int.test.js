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

    it('GET ' + endpointUrl, async () => {
        const response = await request(app)
            .get(endpointUrl)
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('GET ' + endpointUrl + '/:id', async () => {
        const myTodo = await request(app)
            .post(endpointUrl)
            .send(newTodo)
            .expect(201);

        const response = await request(app)
            .get(endpointUrl + '/' + myTodo.body._id)
            .expect(200);
        expect(response.body._id).toStrictEqual(myTodo.body._id);
    })

    it('should return 404', async () => {
        const response = await request(app)
            .get(endpointUrl + '/' + '624228deb2d5f911afb7a6e4')
            .expect(404);
        expect(response.body.message).toBeDefined();
    })

    it('PUT ' + endpointUrl + '/:id', async () => {
        const myTodo = await request(app)
            .post(endpointUrl)
            .send(newTodo)
            .expect(201);
        const response = await request(app)
            .put(endpointUrl + '/' + myTodo.body._id)
            .send({ done: true })
            .expect(200);
        expect(response.body.done).toStrictEqual(true);
    })

});