
const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PASS);

const uri = `mongodb+srv://${username}:${password}@cluster0.8zqti.mongodb.net/todo-tdd?retryWrites=true&w=majority`;
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected!');
    } catch (error) {
        console.log('Database connection error: ' + error.message);
    }
}

module.exports = { connect, closeDatabase: () => mongoose.disconnect() };