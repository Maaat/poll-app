var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
var ensureLoggedIn = require('../ensureLoggedIn');

router.post('/:commentId/reply', ensureLoggedIn, function(req,res,next) {

	models.Comment.findById(req.params.commentId).then(function(parent) {
		if (!parent) {
			res.status(400).send({message:"The parent comment does not exist!"});
			return;
		}

		var comment = {
			UserId: req.user.id,
			DiscussionId: parent.DiscussionId,
			CommentId: parent.id,
			text: req.body.replyText
		};

		models.Comment.create(comment).then(function(comment) {
			comment = comment.get({plain:true});
			comment.User = req.user;
			comment.Comments = [];
			res.status(200).send({comment: comment});
		}).catch(function(err) {
			res.status(400).send({message: err.message});
		});
	});

});

module.exports = router;