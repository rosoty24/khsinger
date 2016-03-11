Session.set("GENDERVALUE","");
Session.set("ALBUMVALUE","");
Session.setDefault("COUNT_NEXT",0);
Session.setDefault("SKIP_SONG",0);
num = 0;
Template.allsong.rendered = function(){
	var count = 1;
	$(".num_page").html(count);
}
Template.addsong.events({
	"change #selectgender":function(){
		var gender = $("#selectgender").val();
		//alert(gender);
		Session.setPersistent("GENDERVALUE",gender);
	},
	"change #selectalbum":function(){
		var album = $("#selectalbum").val();
		//alert(album);
		Session.setPersistent("ALBUMVALUE",album);
	},
	"click #add-song":function(e){
		e.preventDefault();
		var name = $("#name").val();
		var album = $("#selectalbum").val();
		var vol = $("#selectvol").val();
		var singer = $("#selectsinger").val();
		var imageId = Session.get('ADDIMAGEID');
		var linkmp3 =  $("#link").val();
		var link = "/khsinger.com/"+linkmp3;
		var day = new Date();
		var timestamp = day.getTime();
		//alert(name+"=ALBUM="+album+"=VOL="+vol+"=SINGER="+singer+"=IMAGE="+imageId);
		Meteor.call("Addsong",name,album,vol,singer,imageId,link,timestamp,function(error,result){
			if(error){console.log("Insert song problem")}
			else{
				console.log("Song Insert Success");
				Router.go("/admin/allsong");
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
    },
    "click #add-folder":function(){
    	var file = $("#brows").val();
    	//var files = event.target.files;
    	alert(file);
     }
});
Template.allsong.events({
	"click #remove":function(e){
		e.preventDefault();
		if (confirm("Are you sure you want to delete this?")) {
            song.remove({_id:this._id});
        }
	},
	"click #prev":function(){
		var num = $(".num_page").text();
            num --;
            $(".num_page").html(num);
		if(Session.get("SKIP_SONG") >= 10){
			Session.set("SKIP_SONG",Session.get("SKIP_SONG")-10);
		}
	},
	"click #next":function(e){
		e.preventDefault();
		var num = $(".num_page").text();
			num++;
			$(".num_page").html(num);
		Session.set("SKIP_SONG",Session.get("SKIP_SONG")+10);
	}
});
Template.addsong.helpers({
	selectsinger:function(){
		var gen = Session.get("GENDERVALUE");
		if(gen){
			return singer.find({gender:gen});
		}
	},
	getalbum:function(){
		var myalbum = Session.get("ALBUMVALUE");
		if(myalbum){
			return album.find({parentId:myalbum});
		}
	},
	getgender:function(){
		return singer.find();
	},
	selectalbum:function(){
		return album.find({parentId:"0"});
	}
});
Template.allsong.helpers({
	getallsong:function(){
		//Post.find({"user_id":user_id}).skip(0).limit(5);
		//var num = Number($(".num_page").text());
		var num = Session.get("COUNT_NEXT")+1;
		var skip = num + 10;
		console.log("MY_LIMIT="+num);
		return song.find({},{limit:10}).map(function(document, index){
		    document.index = index+1;
		    return document;
		});
	},
	getalbum:function(id){
		var arr = [];
		var result = album.find({_id:id});
		result.forEach(function(item){
			arr.push(item.name);
		});
		return arr;
		
	},
    getsingername:function(id){
    	var arr = [];
    	var result = singer.find({_id:id});
    	result.forEach(function(item){
    		arr.push(item.ename);
    	});
    	return arr;
    },
    getvolname:function(id){
    	var arr = [];
    	var result = album.find({_id:id});
    	console.log("MYRESULT="+result);
    	result.forEach(function(item){
    		console.log("MYVOLNAME="+item.name);
    		arr.push(item.name);
    	});
    	console.log("VOLRESULT="+arr);
    	return arr;
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
    numcount:function(){
    	var num = Session.get("COUNT_NEXT")+1;
    	return num;
    }
});
//====================== EDIT SONG =====================//
Template.editsong.events({
	"change #selectgender":function(){
		var gender = $("#selectgender").val();
		alert(gender);
		Session.setPersistent("GENDERVALUE",gender);
	},
	"change #selectalbum":function(){
		var album = $("#selectalbum").val();
		//alert(album);
		Session.setPersistent("ALBUMVALUE",album);
	},
	"click #edit-song":function(e){
		e.preventDefault();
		var id = this._id;
		var name = $("#name").val();
		var album = $("#selectalbum").val();
		var vol = $("#selectvol").val();
		var singer = $("#selectsinger").val();
		var imageId = Session.get('ADDIMAGEID');
		var currentfile = $("#currentfile").val();
		var link = $("#link").val();
		var timestamp = $("#timestamp").val();
		if(typeof imageId == "undefined"){
			imageId=currentfile;
		}
		//alert(name+"=ALBUM="+album+"=VOL="+vol+"=SINGER="+singer+"=IMAGE="+imageId);
		Meteor.call("Editsong",id,name,album,vol,singer,imageId,link,timestamp,function(error,result){
			if(error){console.log("Insert song problem")}
			else{
				console.log("Song Insert Success");
				Session.set('ADDIMAGEID',undefined);
				Router.go("/admin/allsong");
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
Template.editsong.helpers({
	selectsinger:function(){
		var gen = Session.get("GENDERVALUE");
		if(gen){
			return singer.find({gender:gen});
		}
	},
	getvol:function(){
		var myalbum = Session.get("ALBUMVALUE");
		if(myalbum){
			return album.find({parentId:myalbum});
		}
	},
	getgender:function(){
		return singer.find();
	},
	selectalbum:function(){
		return album.find({parentId:"0"});
	},
	currentalbum:function(id){
		return album.findOne({_id:id}).name;
	},
	currentvol:function(id){
		return album.findOne({_id:id}).name;
	},
	currentsinger:function(id){
		return singer.findOne({_id:id}).khname;
	}
});