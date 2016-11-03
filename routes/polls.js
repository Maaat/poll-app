var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
var ensureLoggedIn = require('../ensureLoggedIn');

/* GET polls listing. */
router.get('/', function(req, res, next) {
	models.Poll.findAll({
		include: [models.User]
	}).then(function(polls) {
		res.send(polls);
	});
});

//add poll
router.post('/add', ensureLoggedIn, function(req,res,next) {
	var poll = req.body;
	poll = restrict(poll, ['name', 'description', 'Options']);

	if (!poll.Options || poll.Options.length<2) { //this should be validated by sequelize.
		res.status(400).send("A new poll must have at least two options.")
		return;
	}

	poll.UserId = req.user.id;
	poll.DiscussionId = -1;
	poll.Discussion = {};

	models.Poll.create(poll, {include: [
		{model: models.Option, required: true},
		{model: models.Discussion, required: true}
	]}).then(function(poll) {
		res.send(poll);
	}).catch(function(err) {
		res.status(400).send(err.message);
	});
});

//poll details view for voting and viewing results
router.get('/:pollId', function(req,res,next) {
	var optionsInclude = {model: models.Option};
	//if the user is logged in, include that user's vote on the option that they voted for.
	if (req.user) {
		optionsInclude.include = [{
			model: models.OptionVote,
			where: {UserId:req.user.id},
			required: false
		}];
	}

	//query for the poll and options.
	models.Poll.findById(req.params.pollId, {
		include: [optionsInclude]
	}).then(function(poll){

		if (!poll) {
			res.status(404).send("Poll not found.");
			return;
		}

		//if the user has voted then get the vote counts and render the results page.
		if (req.user
			&& poll.Options.some(function(option) {
				if (option.OptionVotes) return option.OptionVotes.length>0;
				else return false;
			}
		)) {
			
			//get option ids for the next query
			var optionIds = [];
			for (var option of poll.Options) optionIds.push(option.id);

			//get vote counts of all of this poll's options
			models.OptionVote.findAll({
				attributes: ['OptionId', [sequelize.fn('count', sequelize.col('OptionId')), 'voteCount']],
				where: {
					'OptionId': {in: optionIds}
				},
				group: ['OptionId']
			}).then(function (optionVoteCounts) {
				//this line is needed to add the voteCount attribute to the sequelize instance
				poll = poll.get({plain:true});
				
				//put the voteCounts on the option objects
				for (var option of poll.Options) {
					for (var optionVoteCount of optionVoteCounts) {
						if (optionVoteCount.OptionId==option.id) {
							option.voteCount = optionVoteCount.get('voteCount');
							continue;
						}
					}
					if (!option.voteCount) option.voteCount=0;
				}

				//get the poll discussion with comments
				models.Discussion.findById(poll.DiscussionId, {
					include: [{
						model: models.Comment,
						include: [{
							model: models.User,
							attributes: ['id', 'name']
						}]
					}]
				}).then(function(discussion) {

					poll.Discussion = discussion.getTreeDiscussion();
					res.send(poll);
					
				});

			});
		}
		else {
			res.send(poll);
		}

	});
});

//place a vote on a poll
router.post('/:pollId/vote', ensureLoggedIn, function(req,res,next) {
	var userId = req.user.id;
	var pollId = req.params.pollId;
	var optionId = req.body.optionId;

	//include options and any of their votes by this user
	models.Poll.findById(pollId, {
		include: [{
			model: models.Option,
			attributes: ['id'],
			required:false,
			include: [{
				model: models.OptionVote,
				attributes: ['id'],
				required:false,
				where: {
					UserId: userId
				}
			}]
		}]
	}).then(function(poll) {
		//ensure that this option is for this poll
		if (!poll.Options.some(function(option) {return option.id==optionId})) {
			res.status(400).send("This option is not for this poll.");
		}
		//ensure that this user has not already voted
		else if (poll.Options.some(function(option) {return option.OptionVotes.length>0})) {
			res.status(400).send("You have already voted in this poll.");
		}
		else {
			models.OptionVote.create({
				UserId: userId,
				OptionId: optionId
			}).then(function(OptionVote) {
				res.redirect('/api/polls/'+pollId);
			});
		}
	});
});

module.exports = router;
