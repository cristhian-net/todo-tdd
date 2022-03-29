## Todo API
Basic REST API for ToDos

### Run express app locally
Create a file called .env, and put database config in there (clone .env.example and replace)

`npm start`

### Run tests

Create .env.test.local file and put Mongo test database config before running integration tests, and then run

`npm test`

If you only want to run unit tests in watch mode (no need for database), run

`npm run test:watch`