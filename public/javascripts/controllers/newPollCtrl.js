app.controller('newPollCtrl', [
	'$scope',
	function($scope) {
		$scope.poll = {
			Options: [{},{}]
		};

		$scope.addOption = function() {
			$scope.poll.Options.push({});
		};

		$scope.removeOption = function(option) {
			$scope.poll.Options.splice($scope.poll.Options.indexOf(option),1);
			if ($scope.poll.Options.length<1) $scope.addOption();
		}

		$scope.submit = function() {
			$('#newPoll :input[name=jsonPoll]').val(JSON.stringify($scope.poll));
		}
}]);
