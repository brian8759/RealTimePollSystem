"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
	ip: {type: String, required: true}
});

var choiceSchema = new Schema({
	text: {type: String, required: true},
	// nested schema
	votes: [voteSchema]
});

var pollSchema = new Schema({
	question: {type: String, required: true},
	choices: [choiceSchema]
});

// export a model of pollSchema
module.exports = mongoose.model('PollsInDB', pollSchema);
