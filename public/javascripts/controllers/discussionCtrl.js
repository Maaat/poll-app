app.controller('discussionCtrl', [
	'$scope', '$http',
	function($scope, $http) {

		$scope.discussion = discussion;

		$scope.submitComment = function() {
			var data = {
				commentText: $scope.commentText
			};
			$http.post('/discussions/'+discussion.id+'/comment', data)
				.success(function(data) {
					$scope.discussion.Comments.push({text: $scope.commentText, User: currentUser});
					$scope.commentText="";
				})
				.error(function(data) {
					$scope.error=data.message;
				});
		}

		$scope.submitReply = function(comment, replyText) {
			var data = {
				replyText: replyText
			};
			$http.post('/comments/'+comment.id+'/reply', data)
				.success(function(data) {
					comment.Comments.push({text: replyText, User: currentUser});
					replyText="";
				})
				.error(function(data) {
					$scope.error=data.message;
				});
		}

}]);