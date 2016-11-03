// Used to restrict the fields on objects pulled from the database using Sequelize
// and to remove unwanted fields when persisting user input.
// Usage:
//		restrict(polls, ['name','description'])
GLOBAL.restrict = function(obj, attributes) {
	if (typeof obj == 'undefined') return obj;

	var restrictedObj;

	switch(obj.constructor) {
		case Array:
		restrictedObj = [];
		for (var element of obj) {
			restrictedObj.push(restrict(element,attributes));
		}
		return restrictedObj;

		default:
		restrictedObj = {};
		for (var i in attributes) {
			var attrValue = attributes[i];
			restrictedObj[attrValue]=obj[attrValue];
		}
		return restrictedObj;
	}
}