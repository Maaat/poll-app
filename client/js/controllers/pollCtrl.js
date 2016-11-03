function pollCtrl($scope, $http, $state, $stateParams) {
	$http.get('/api/polls/' + $stateParams.id)
		.success(function(data) {
			$scope.poll = data;
			$scope.discussion = data.Discussion;
		})
		.error(function(data) {
			$scope.$parent.error = data;
		});

	$scope.vote = function(option) {
		$http.post('/api/polls/' + $scope.poll.id + '/vote', {optionId: option.id} )
			.success(function(data) {
				$scope.poll = data;
				$scope.discussion = data.Discussion;
			})
			.error(function(data) {
				$scope.$parent.error = data;
			});

	}
}
pollCtrl.$inject = ['$scope','$http','$state','$stateParams'];

module.exports = pollCtrl;