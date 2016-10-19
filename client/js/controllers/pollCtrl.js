function pollCtrl($scope, $http, $state, $stateParams) {
	$http.get('/api/polls/' + $stateParams.id)
		.success(function(data) {
			$scope.poll = data;
		});

	$scope.vote = function(option) {
		$http.post('/api/polls/' + $scope.poll.id + '/vote', {optionId: option.id} )
			.success(function(data) {
				$scope.poll = data;
			})
			.error(function(data) {
				$scope.$parent.displayError = data;
			})

	}
}
pollCtrl.$inject = ['$scope','$http','$state','$stateParams'];

module.exports = pollCtrl;