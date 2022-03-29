const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();
require('dotenv').config();
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

const todosRouter = require('./routes/todos.routes');

app.use(express.json());

app.use('/api/todos', todosRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => res.json('Hello World!'));

module.exports = app;
module.exports.mongodb = mongodb;
