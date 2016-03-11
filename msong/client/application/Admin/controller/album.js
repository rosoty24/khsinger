Template.addalbum.events({
	"click #add-album":function(e){
		e.preventDefault();
		var name = $("#albumname").val();
		var parent = $("#parentalbum").val();
		var imageId = Session.get('ADDIMAGEID');
		alert(name+parent+imageId);
		Meteor.call("Addalbum",name,parent,imageId,function(error,result){
			if(error){console.log("Album Insert Problem")}
			else{
				console,log("Album Insert Success");
				Router.go("/admin/album");
			}
		});
	},
	"change #upload": function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});
Template.addalbum.helpers({
	parentalbum:function(){
    	return album.find({parentId:"0"});
    }
});
Template.album.helpers({
	getAlbum:function(){
		return album.find({parentId:"0"});
	},
	getImage: function(image){
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getparentname:function(parent){
    	return album.find({parentId:parent});
    }
});
Template.album.events({
	"click #remove":function(e){
		e.preventDefault();
		if (confirm("Are you sure you want to delete this?")) {
            album.remove({_id:this._id});
        }
	}
});
Template.editalbum.events({
	"click #edit-album":function(e){
		e.preventDefault();
		var id = this._id;
		var name = $("#albumname").val();
		var parent = $("#parentalbum").val();
		var imageId = Session.get('ADDIMAGEID');
		var currentImage = $("#currentImage").val();
		if(typeof imageId == "undefined"){
			imageId=currentImage;
		}
		alert(name+parent+imageId);
		Meteor.call("Editalbum",id,name,parent,imageId,function(error,result){
			if(error){console.log("Album Insert Problem")}
			else{
				console,log("Album Insert Success");
				Session.get('ADDIMAGEID',undefined);
				Router.go("/admin/album");
			}
		});
	},
	"change #upload": function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});