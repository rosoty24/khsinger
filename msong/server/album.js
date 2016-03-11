Meteor.methods({
	Addalbum:function(name,parent,image){
		var attr={
			name:name,
			parentId:parent,
			imageId:image
		}
		return album.insert(attr);
	},
	Editalbum:function(id,name,parent,image){
		var attr={
			name:name,
			parentId:parent,
			imageId:image
		}
		return album.update({_id:id},{$set:attr});
	}
});