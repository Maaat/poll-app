function userViewCtrl($scope, $http, $stateParams) {

	$http.get('/api/users/'+$stateParams.name)
		.success(function(data) {
			$scope.user = data;
			$scope.discussion = data.Discussion;
		})
		.error(function(data) {
			$scope.$parent.error = data;
		});
}
userViewCtrl.$inject = ['$scope','$http','$stateParams'];

module.exports = userViewCtrl;