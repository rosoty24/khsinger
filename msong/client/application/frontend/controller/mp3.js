Template.home.rendered = function(){
	$(".my_audio").trigger('load');
}
Template.home.helpers({
	allsinger:function(){
		return singer.find();
	},
	singerImage:function(image){
		var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
	getmp3:function(){
		return song.find();
	},
	player:function(){
		var play = Session.get("MP3_LIST");
		if(play){
			return false;		}
		else{
		 	return "http://www.khmer-songs.com/khmer/artists/seiha/01 Mun Kheung Sur Bong Sen (Seyha).mp3";
			
		 }
	},
	mp3play: function(file){
        var img = images.findOne({_id:file});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getsinger:function(id){
    	return singer.findOne({_id:id}).ename;
    },
    getalbum:function(id){
    	return album.findOne({_id:id}).name;
    },
    getvol:function(id){
    	console.log("VOL="+id);
    	return album.findOne({_id:id}).name;
    }
});
Template.home.events({
	"click #singerlist":function(){
		var id = this._id;
		//alert("singer="+id);
		Session.setPersistent("LIST_MP3_SINGER",id);
		Session.setPersistent("LIST_MP3_ALBUM",undefined);
	},
	"click #play-select":function(e){
		Session.get("MP3_LIST");
		var player=document.getElementById('player');
	    var sourceOgg=document.getElementById('player');
	    var sourceMp3=document.getElementById('player');
	    var value = $(e.currentTarget).attr("data-value");//$(this).attr('data-value');
	    //alert(value);
	    sourceOgg.src= "uploads/"+value;
	    sourceMp3.src= "uploads/"+value;
	    
	   	player.load(); //just start buffering (preload)
	   	player.play(); //start playing
	}
});