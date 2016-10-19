function pollListCtrl($scope, $http) {

	$http.get('/api/polls')
		.success(function(data) {
			$scope.polls = data;
		});
}
pollListCtrl.$inject = ['$scope','$http'];

module.exports = pollListCtrl;