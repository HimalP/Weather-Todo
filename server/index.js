const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const todos = require('./routes/todos.js');

app.use('/todos', todos);

app.listen(config.port, () =>
    console.log(`Server online: Port ${config.port}`)
);
