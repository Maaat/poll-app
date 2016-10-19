function discussionCtrl($scope, $http) {

		$scope.discussion = discussion;

		$scope.submitComment = function() {
			var data = {
				commentText: $scope.commentText
			};
			$http.post('/discussions/'+discussion.id+'/comment', data)
				.success(function(data) {
					$scope.discussion.Comments.push(data.comment);
					$scope.commentText="";
					$scope.discussion.commentBox=false;
				})
				.error(function(data) {
					$scope.error=data.message;
				});
		}

		$scope.submitReply = function(comment) {
			var data = {
				replyText: comment.replyText
			};
			$http.post('/comments/'+comment.id+'/reply', data)
				.success(function(data) {
					comment.Comments.push(data.comment);
					comment.replyText="";
					comment.replyBox=false;
				})
				.error(function(data) {
					$scope.error=data.message;
				});
		}

}
discussionCtrl.$inject = ['$scope','$http'];

module.exports = discussionCtrl;