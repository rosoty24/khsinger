Template.listalbum.helpers({
    AlbumName:function(){
        var id = this._id;
        return album.findOne({_id:id}).name;
    },
	getlistalbum:function(){
        var id = this._id;
        console.log("id="+id);
		return album.find({parentId:id});
	},
	getImage: function(image){
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return "/uploads/"+img.copies.images.key;
        }else{
            return "/images/album_default.jpg";
        }
    }
});
Template.listalbum.events({
    "click #listalbum":function(){
        var id = this._id;
        //alert("album="+id);
        Session.setPersistent("LIST_MP3_ALBUM",id);
        Session.setPersistent("LIST_MP3_SINGER",undefined);
    }
});