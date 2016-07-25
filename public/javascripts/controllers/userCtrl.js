app.controller('userCtrl', [
	'$scope', '$uibModal',
	function($scope, $uibModal) {
		if (typeof user != 'undefined') $scope.user=user;

		$scope.showLogin = function() {
			$uibModal.open({
				templateUrl: 'loginForm.html',
				backdrop: true,
				windowClass: 'modal',
				size: 'lg',
				controller: function($scope, $uibModalInstance) {
					$scope.createAccount=function() {
						alert("create");
					}
					$scope.logIn=function() {
						alert("log in");
					}
				},
				resolve: {

				}
			});
		};
	}
]);

app.directive('loginRequired', function() {
	return function(scope, element, attrs) {
		$(element).click(function() {
			if (typeof scope.user == 'undefined') {
				scope.showLogin();
				return false;
			}
			return true;
		});
	};
});