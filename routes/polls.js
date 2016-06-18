var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET polls listing. */
router.get('/', function(req, res, next) {
	models.Poll.findAll(
		).then(function(polls) {
		res.render('polls', {
			title: 'Polls',
			polls: polls
		});
	});
});

//poll creation page
router.get('/create', function(req,res) {
	res.render('polls/createPoll', {
		title: 'Create Poll'
	});
});

//add poll
router.post('/add', function(req,res) {
	models.Poll.create({
		name: req.body.name
	}).then(function(poll) {
		res.redirect(poll.id);
	});
});

//poll details page
router.get('/:pollId', function(req,res) {
	models.Poll.findById(req.params.pollId)
	.then(function(poll){
		res.render('polls/poll', {
			poll: poll
		});
	});
});

module.exports = router;
