Meteor.methods({
	insertsinger:function(ename,khname,myselect,image){
		var attr = {
			ename:ename,
			khname:khname,
			gender:myselect,
			imageId:image
		}
		return singer.insert(attr);
	},
	editsinger:function(id,ename,khname,myselect,image){
		var attr = {
			ename:ename,
			khname:khname,
			gender:myselect,
			imageId:image
		}
		return singer.update({_id:id},{$set:attr});
	}
})