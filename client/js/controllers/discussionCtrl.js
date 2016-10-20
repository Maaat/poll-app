function discussionCtrl($scope, $http) {

		if ($scope.$parent.poll) $scope.discussion = $scope.$parent.poll.Discussion;
		else if ($scope.$parent.user) $scope.discussion = $scope.$parent.user.Discussion;

		$scope.submitComment = function() {
			$http.post('/api/discussions/'+$scope.discussion.id+'/comment', {text: $scope.commentText})
				.success(function(data) {
					$scope.discussion.Comments.push(data);
					$scope.commentText="";
					$scope.discussion.commentBox=false;
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