var express = require('express');
var router = express.Router();

var Poll = require('../schema/pollSchema');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Real Time Poll System' });
});

/* List all the polls in DB */
router.get('/polls/polls', function(req, res) {
	// Just do a normal query to MongoDB, find all polls, and do a projection on question
	Poll.find({}, 'question', function(err, polls) {
		if(err) {
			res.status(500).json({ status: 'failure' });
		} else {
			res.json(polls);
		}
	});
});

/* Retrieve a single poll */
router.get('/polls/:id', function(req, res) {
	// get the id of the poll
	var pollId = req.params.id;
	// use this pollId to do a query, we keep all the attributes, no projection
	// use lean, to retrieve the raw js object, instead of mongo document
	Poll.findById(pollId, '', {lean: true}, function(err, poll) {
		if(err) {
			res.status(500).json({ status: 'failure' });
		} else {
			// we can simply send it back, res.json(poll), or we can add something more
			var voted = false;
			var total = 0;
			var userChoice;

			// loop through the poll object, poll:{question: String, choices: [choiceSchema]}
			for(c in poll.choices) {
				var choice = poll.choices[c];
				// each choice:{text: String, votes[voteSchema]}
				for(v in choice.votes) {
					var vote = choice.votes[v];
					total++;
					// check if current user vote this
					if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
						voted = true;
						userChoice = { _id: choice._id, text: choice.text };
					}
				}
			}

			// add these info to poll 
			poll.voted = voted;
			poll.total = total;
			poll.userChoice = userChoice;
			// then send it back
			res.json(poll);
		}
	});
});

/* Create a new Poll */
router.post('/polls', function(req, res) {
	// get the req content
	var content = req.body;
	// apply this filter to choices[], we only want non-empty text
	var choices = content.choices.filter(function(v) {
		return v.text != '';
	});
	// build up the pollObj
	var pollObj = {
		question: content.question,
		choices: choices
	};

	// create a poll model object to insert into MongoDB
	var poll = new Poll(pollObj);
	// save this into MongoDB
	poll.save(function(err, doc) {
		if(err || !doc) {
			res.status(500).json({ status: 'failure' });
		} else {
			res.json(doc);
		}
	});
});

module.exports = router;
