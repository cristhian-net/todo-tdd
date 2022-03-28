const express = require('express');
const app = express();
require('dotenv').config();
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

const todosRouter = require('./routes/todos.routes');

app.get('/', (req, res) => res.json('Hello World!'));

app.use(express.json());
app.use('/api/todos', todosRouter);

module.exports = app;