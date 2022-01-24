const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/my-task';

mongoose.connect(URI)
    .then(db => console.log('db is connected'))
    .catch(err => console.log.error(err));

module.exports = mongoose;