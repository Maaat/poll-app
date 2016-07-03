app.controller('newPollCtrl', [
	'$scope',
	function($scope) {
		$scope.poll = {
			name: "",
			Options: [
				{
					name: "",
					description: ""
				},
				{
					name: "",
					description: ""
				}
			]
		};

		$scope.addOption = function() {
			$scope.poll.Options.push({name:"", description:""});
		};

		$scope.removeOption = function(option) {
			$scope.poll.Options.splice(option,1);
			if ($scope.poll.Options.length<1) $scope.addOption();
		}

		$scope.submit = function() {
			$('#newPoll :input[name=jsonPoll]').val(JSON.stringify($scope.poll));
		}
}]);
