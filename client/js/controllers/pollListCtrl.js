app.controller('pollListCtrl', [
	'$scope',
	function($scope) {
		$scope.polls=(typeof polls == 'undefined') ? [] : polls;
	}
]);