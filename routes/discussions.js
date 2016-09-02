var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
var ensureLoggedIn = require('../ensureLoggedIn');

router.post('/:discussionId/comment', ensureLoggedIn, function(req,res,next) {

	var comment = {
		UserId: req.user.id,
		DiscussionId: req.params.discussionId,
		text: req.body.commentText
	};

	models.Comment.create(comment).then(function(comment) {
		comment = comment.get({plain:true});
		comment.User = req.user;
		comment.Comments = [];
		res.status(200).send({comment: comment});
	}).catch(function (err) {
		res.status(400).send({message: err.message});
	});

});

module.exports = router;