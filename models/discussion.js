"use strict";

module.exports = function(sequelize, DataTypes) {
  var Discussion = sequelize.define("Discussion", {

  }, {
    classMethods: {
      associate: function(models) {
        Discussion.hasMany(models.Comment);
      }
    },
    instanceMethods: {
    	//organize the comments into a reply tree structure
    	getTreeDiscussion: function() {

    		//comments need to be plain to be restructured.
    		var treeDiscussion = this.get({plain:true});

    		if (!treeDiscussion.Comments) {
    			treeDiscussion.Comments = [];
    			return treeDiscussion;
    		}

    		var commentsMap = {};
			var organizedComments = [];
			for (var comment of treeDiscussion.Comments) {

				//map comments by id
				commentsMap[comment.id] = comment;
				
				//add child comment list
				comment.Comments = [];
				
				//if the comment is a reply to another comment then put it in the parent's child list.
				if (comment.CommentId) commentsMap[comment.CommentId].Comments.push(comment);

				//otherwise put it into the top level list
				else organizedComments.push(comment);
				
			}

			treeDiscussion.Comments=organizedComments

			return treeDiscussion;
    	}
    }
  });

  return Discussion;
};