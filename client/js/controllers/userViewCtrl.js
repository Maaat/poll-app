function userViewCtrl($scope) {
	$scope.user = user;
}
userViewCtrl.$inject = ['$scope'];

module.exports = userViewCtrl;