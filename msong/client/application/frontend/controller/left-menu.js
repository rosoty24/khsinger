Template.left.helpers({
	getAlbumName:function(){
		return album.find({parentId:"0"});
	}
});
Template.left.events({
	"click #listalbum":function(){
		var id = this._id;
        
    }
});