Meteor.methods({
	Addcategories:function(name){
		var attr={
			name:name,
			image:image
		}
		return categories.insert(attr);
	}
});