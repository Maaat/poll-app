function loginRequired() {
	return function(scope, element, attrs) {
		$(element).click(function() {
			if (typeof scope.currentUser == 'undefined') {
				scope.showLogin($(this).prop('ui-sref'));
				return false;
			}
			return true;
		});
	};
};
module.exports = loginRequired;