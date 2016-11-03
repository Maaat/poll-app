function newPollCtrl($scope,$http,$state) {

	$scope.poll = {Options: [{},{}]};

	$scope.addOption = function() {
		$scope.poll.Options.push({});
	};

	$scope.removeOption = function(option) {
		$scope.poll.Options.splice($scope.poll.Options.indexOf(option),1);
		if ($scope.poll.Options.length<2) $scope.addOption();
	}

	$scope.submit = function() {
		$http.post('/api/polls/add', $scope.poll)
			.success(function(data) {
				$state.go('poll', {id: data.id})
			})
			.error(function(data){
				$scope.$parent.error = data;
			});
	}
}
newPollCtrl.$inject = ['$scope','$http','$state'];

module.exports = newPollCtrl;