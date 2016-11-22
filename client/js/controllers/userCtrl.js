function userCtrl($scope, $http, $uibModal, $uibModalStack, $state, $rootScope) {

	//check if we are logged in
	var loggedinCheck = $http.get('/api/users/currentUser')
		.success(function(data) {
			if (data.id) $scope.currentUser = data;
		});

	//require login for certain states
	var loginRequiredStates = ['newPoll'];

	//on state change start
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

		//check if this is a restricted state and if the user is logged in.
		if (loginRequiredStates.indexOf(toState.name) != -1 && !options.loginConfirmed) {
			
			//stop the state change until the login is confirmed
			event.preventDefault();

			//check for the current user after the current user check promise has finished.
			loggedinCheck.then(function() {
				if ($scope.currentUser) {
					$state.go(toState, toParams, {loginConfirmed:true});
				}
				else {
					$scope.showLogin({toState:toState, toParams:toParams});
				}
			});
		}
	});

	//remove error message on successful state change
	$rootScope.$on('$stateChangeSuccess', function() {
		$scope.error = undefined;
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
		var data = JSON.stringify($scope.newUser);
		$http.post('/api/users/add', data)
			.success(function(data) {
				$scope.accountCreated = data;
				$scope.newUser = {};
			})
			.error(function(data) {
				$scope.accountCreationError = data;
			});
	};

	$scope.login=function() {
		var data = JSON.stringify($scope.existingUser);
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

				$scope.existingUser = {};

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
				$scope.error = data;
			});
	};
}
userCtrl.$inject = ['$scope','$http','$uibModal', '$uibModalStack', '$state', '$rootScope'];

module.exports = userCtrl;