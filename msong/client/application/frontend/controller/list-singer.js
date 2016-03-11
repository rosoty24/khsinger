Template.listsinger.helpers({
	getlistsinger:function(){
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
Template.listsinger.events({
    "click #list":function(e){
        e.preventDefault();
        var id = this._id;
        Session.set("SINGERVALUE",id);
        Router.go("singermp3");
    }
});