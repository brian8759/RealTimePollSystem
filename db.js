var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/RealTimePollSystem');

var myConnection = mongoose.createConnection('mongodb://localhost:27017', 'RealTimePollSystem');

module.exports = myConnection;