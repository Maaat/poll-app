// Used to restrict the fields on objects pulled from the database using Sequelize
// and to remove unwanted fields when persisting user input.
// Usage:
//		restrict(polls, ['name','description'])
// 		restrict(polls, ['name', Options: ['name']]) //restrict the fields on a foreign key object/array
GLOBAL.restrict = function(obj, attributes) {
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

			switch(attrValue.constructor) {
				case String:
				restrictedObj[attrValue]=obj[attrValue];
				break;

				case Object: //for when you restrict the fields on a foreign key object/array
				restrictedObj[i]=restrict(obj[i], attrValue);
				break;
			}

		}
		return restrictedObj;
	}
}