const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    nombre: {type: String, required: true},
    valor: {type: Number, required: true}
});

module.exports = mongoose.model('Task', TaskSchema); 