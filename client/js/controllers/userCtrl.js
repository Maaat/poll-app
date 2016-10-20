function userCtrl($scope, $http, $uibModal, $uibModalStack, $state, $rootScope, $timeout) {

	//check if we are logged in
	$http.get('/api/users/currentUser')
		.success(function(data) {
			if (data.id) $scope.currentUser = data;
		});

	//require login for certain states
	var loginRequiredStates = ['newPoll'];
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		if (loginRequiredStates.indexOf(toState.name) != -1) {
			if (!$scope.currentUser) {
				event.preventDefault();
				$scope.showLogin({toState: toState, toParams: toParams});
			}
		}
	});

	var dest = undefined;
	
	$scope.showLogin = function(sref) {
		dest = sref;
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
				$scope.currentUser = data;
				$uibModalStack.dismissAll()

				if (dest) {
					$state.go(dest.toState, dest.toParams);
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
		$http.post('/api/logout')
			.success(function(data) {
				$scope.currentUser = undefined;

				if (loginRequiredStates.indexOf($state.current.name) != -1) {
					$state.go('home');
				}
				else {
					$state.reload();
				}
			})
			.error(function(data) {
				$scope.$parent.displayError = data;
			});
	};
}
userCtrl.$inject = ['$scope','$http','$uibModal', '$uibModalStack', '$state', '$rootScope', '$timeout'];

module.exports = userCtrl;