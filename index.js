const express = require('express')

require('dotenv').config()

const port = 5000 || process.env.PORT;
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/todo';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));


var cors = require('cors')


app.use(cors())
const todoHandler = require('./todohandle/todohandler');

app.listen(port, () => {

    console.log('Server started on port 5000');
});
console.log('aaaa', process.env.PORT)
app.use('/todo', todoHandler);











