app.controller('newPollCtrl', [
	'$scope',
	function($scope) {

		$scope.poll = (typeof poll == 'undefined')
		? { Options: [{},{}] }
		: poll;

		$scope.addOption = function() {
			$scope.poll.Options.push({});
		};

		$scope.removeOption = function(option) {
			$scope.poll.Options.splice($scope.poll.Options.indexOf(option),1);
			if ($scope.poll.Options.length<2) $scope.addOption();
		}

		$scope.submit = function() {
			$('#newPollForm :input[name=jsonPoll]').val(JSON.stringify($scope.poll));
		}
}]);
