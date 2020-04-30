const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
const config = require('../config');

// Get todos
router.get('/', async (req, res) => {
    const todos = await loadTodosCollection();
    res.send(await todos.find({}).toArray());
});

// Create a new todo
router.post('/', async (req, res) => {
    const todos = await loadTodosCollection();
    await todos.insertOne({
        todo: req.body.todo,
        completed: false,
    });
    res.sendStatus(200);
});

// Delete a todo item
router.delete('/:id', async (req, res) => {
    const todos = await loadTodosCollection();
    await todos.deleteOne({
        _id: ObjectId(req.params.id),
    });
    res.status(200).send();
});

// Connect to todoItems collection
async function loadTodosCollection() {
    const client = await MongoClient.connect(config.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return client.db('todo').collection('todoItems');
}

module.exports = router;
