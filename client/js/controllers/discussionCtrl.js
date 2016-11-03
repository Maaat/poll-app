function discussionCtrl($scope, $http) {

		$scope.submitComment = function() {
			$http.post('/api/discussions/'+$scope.$parent.discussion.id+'/comment', {text: $scope.commentText})
				.success(function(data) {
					$scope.$parent.discussion.Comments.push(data);
					$scope.commentText="";
					$scope.$parent.discussion.commentBox=false;
				})
				.error(function(data) {
					$scope.error=data;
				});
		}

		$scope.submitReply = function(comment) {
			$http.post('/api/comments/'+comment.id+'/reply', {text: comment.replyText})
				.success(function(data) {
					comment.Comments.push(data);
					comment.replyText="";
					comment.replyBox=false;
				})
				.error(function(data) {
					$scope.error=data;
				});
		}

}
discussionCtrl.$inject = ['$scope','$http'];

module.exports = discussionCtrl;