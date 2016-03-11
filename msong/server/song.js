Meteor.methods({
	Addsong:function(name,album,vol,singer,imageId,link,timestamp){
		var attr = {
			name:name,
			album:album,
			vol:vol,
			singer:singer,
			file:imageId,
			link:link,
			createDate:timestamp,
			status:1,
			trash:1
		}
		return song.insert(attr);
	},
	Editsong:function(id,name,album,vol,singer,imageId,link,timestamp){
		var day = new Date();
		var updateDate = day.getTime();
		var attr = {
			name:name,
			album:album,
			vol:vol,
			singer:singer,
			file:imageId,
			link:link,
			createDate:timestamp,
			updateDate:updateDate,
			status:1,
			trash:1
		}
		return song.update({_id:id},{$set:attr});
	}
});