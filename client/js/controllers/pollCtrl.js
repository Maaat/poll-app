app.controller('pollCtrl', [
	'$scope', '$http',
	function($scope, $http) {
		$scope.poll = poll;

		$scope.vote = function(option) {
			$('form[name=voteForm] input[name=optionId]').val(option.id);
		}
	}
]);
