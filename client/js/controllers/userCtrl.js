function userCtrl($scope, $http, $uibModal, $state) {
	
	//check if we are logged in
	$http.get('/api/users/currentUser')
		.success(function(data) {
			if (data.id) $scope.currentUser = data;
		})

	var dest = undefined;
	
	$scope.showLogin = function(href) {
		dest = href;
		$uibModal.open({
			templateUrl: 'loginForm.html',
			backdrop: true,
			windowClass: 'modal',
			size: 'lg',
			scope: $scope
		});
	};

	$scope.createAccount=function() {
		var data = JSON.stringify({
			username: $scope.newUsername,
			password: $scope.newPassword
		});
		$http.post('/api/users/add', data)
			.success(function(data) {
				$scope.accountCreated = data;
			})
			.error(function(data) {
				$scope.accountCreationError = data;
			});
	};

	$scope.login=function() {
		var data = JSON.stringify({
			username: $scope.username,
			password: $scope.password
		});
		$http.post('/api/login', data)
			.success(function(data) {
				if (dest) {
					$state.go(dest);
				}
				else {
					$state.reload();
				}
			})
			.error(function(data) {
				$scope.loginError = data;
			});
	};

	$scope.logout = function() {
		$http.get('/api/logout')
			.success(function(data) {
				$state.reload();
			})
			.error(function(data) {
				$scope.$parent.displayError = data;
			});
	};
}
userCtrl.$inject = ['$scope','$http','$uibModal', '$state'];

module.exports = userCtrl;