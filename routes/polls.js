var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET polls listing. */
router.get('/', function(req, res, next) {
	models.Poll.findAll()
		.then(function(polls) {
			polls = restrict(polls,['id','name','description','createdAt','closeTime','closedManually']);

			res.render('polls/polls', {
				title: 'Polls',
				polls: polls
			});
		});
});

//poll creation page
router.get('/new', function(req,res) {
	res.render('polls/newPoll', {
		title: 'New Poll'
	});
});

//add poll
router.post('/add', function(req,res) {
	console.log(JSON.stringify(req.body));

	var poll = JSON.parse(req.body.jsonPoll);
	console.log(JSON.stringify(poll));

	models.Poll.create(poll, {include: [models.Option]}).then(function(poll) {
		res.redirect(poll.id);
	});
});

//poll details page
router.get('/:pollId', function(req,res) {
	models.Poll.findById(req.params.pollId, {include: [models.Option]})
	.then(function(poll){
		res.render('polls/poll', {
			poll: poll
		});
	});
});

module.exports = router;
