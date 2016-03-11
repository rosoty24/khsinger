Template.addsinger.events({
	"click #add-singer":function(e){
		e.preventDefault();
		var ename = $("#enname").val();
		var khname = $("#khname").val();
		var myselect = $("#selectgender").val();
		var imageId = Session.get('ADDIMAGEID');
		//alert("Welcome Singer"+ename+khname+myselect+imageId);
		Meteor.call("insertsinger",ename,khname,myselect,imageId,function(error,result){
			if(error){}
			else{
				console.log("singer insert success");
				Session.set("ADDIMAGEID",undefined);
				Router.go("/admin/singer");
			}
		});
	},
	'change #upload': function(event, template) {
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
Template.singer.helpers({
	getsinger:function(){
		return singer.find({});
	},
	getImage: function(image){
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    }
});
Template.singer.events({
	"click #remove":function(){
		 if (confirm("Are you sure you want to delete this?")) {
            singer.remove({_id:this._id});
        }
	}
});
Template.editsinger.events({
	"click #edit-singer":function(e){
		e.preventDefault();
		var id = this._id;
		var ename = $("#enname").val();
		var khname = $("#khname").val();
		var myselect = $("#selectgender").val();
		var currentImage = $("#imageId").val();
		var imageId = Session.get('ADDIMAGEID');
		//alert("Welcome Singer"+ename+khname+myselect+imageId);
		if(typeof imageId == "undefined"){
			imageId=currentImage;
		}
		Meteor.call("editsinger",id,ename,khname,myselect,imageId,function(error,result){
			if(error){}
			else{
				console.log("singer insert success");
				Session.set("ADDIMAGEID",undefined);
				Router.go("/admin/singer");
			}
		});
	},
	'change #upload': function(event, template) {
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