app.controller('userCtrl', [
	'$scope',
	function($scope, $mdDialog, $mdMedia) {
		if (typeof user != 'undefined') $scope.user=user;

		$scope.status = '  ';
		$scope.showLogin = function(ev) {
			var login = $mdDialog.prompt()
				.title('Log in')
				.textContent('Log in to continue')
				.placeholder('placeholder')
				.ariaLabel('aria label')
				.targetEvent(ev)
				.ok('Log in')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function(result) {
				$scope.status='confirmed';
			}, function() {
				$scope.status='did not log in';
			});
		};
	}
]);

app.directive('loginRequired', function() {
	return function(scope, element, attrs) {
		$(element).click(function() {

			return false;
		});
	};
});