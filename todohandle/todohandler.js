const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const mongooseSchema = require('../MongooseSchema/MongooseSchema');
//creating object 
const Todo = new mongoose.model('Todo', mongooseSchema);

//get all the todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    try {

        res.send(todos);


    }
    catch (error) {
        res.status(500).json({
            error: 'there is server site error'
        })
    }

});
//get todo by id
router.get('/:id', async (req, res) => {

    const todos = await Todo.findOne({ _id: req.params.id });
    res.send(todos);

})
//post one todo
router.post('/', async (req, res) => {
    //creating


    const todo = new Todo(req.body);
    //they have save name building method
    try {
        await todo.save()
        res.status(200).json({
            message: 'successfully data enrolled'
        })
    }
    catch (error) {
        res.status(500).json({
            error: 'there is server site error'
        })
    }

})
router.post('/all', async (req, res) => {
    //creating


    const todo = Todo.insertMany(req.body);
    //they have save name building method
    try {
        await todo;
        res.status(200).json({
            message: 'successfully data enrolled'
        })
    }
    catch (error) {
        res.status(500).json({
            error: 'there is server site error'

        })
    }

})



// update todo
// router.put('/:id', async (req, res) => {
//     try {
//         const result = await Todo.findByIdAndUpdate(
//             { _id: req.params.id },
//             { $set: { title: 'i am blank' } }, {}
//         );
//         if (result.modifiedCount === 1) {
//             res.status(200).send('Todo updated successfully');
//         } else {
//             res.status(500).send('Failed to update todo');
//         }
//     } catch (err) {
//         res.status(500).send('An error occurred while updating todo');
//     }
// });
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,
            { title: 'i am blank' },
            { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.send(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});




//delete todo
router.delete('/:id', async (req, res) => {
    const todos = await Todo.deleteOne({ _id: req.params.id });
    res.send(todos);
})

module.exports = router;