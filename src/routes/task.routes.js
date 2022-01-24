const express = require('express');
const tasks = require('../models/tasks');
const router = express.Router();

const Task = require('../models/tasks');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
})
router.post('/', async (req, res) => {
    const { nombre, valor } = req.body
    const task = new Task({ nombre, valor});
    await task.save();
    console.log(task)
    res.json({status: 'Tarea guardada'});
});
router.put('/:id', async (req, res) => {
    const {nombre, valor } = req.body;
    const newTask = {nombre, valor};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Tarea recibida'});
});
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Tarea eliminada'});
})
 
module.exports = router;