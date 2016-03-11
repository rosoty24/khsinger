Template.listmp3.rendered = function(){
	$("#audio").load();
	var link = $("ul#playlist li a:first").attr("data-link");
		console.log(link);
		$("#audio").attr("src",link);
		// if(link)
		// 	$("ul#playlist li:first").addClass("active");
		// else
		// 	$("ul#playlist li:first").removeClass("active");
	var audio;
	var playlist;
	var tracks;
	var current;

	init();
	function init(){
	    current = 0;
	    audio = $('audio');
	    playlist = $('#playlist');
	    tracks = playlist.find('li a');
	    len = tracks.length - 1;
	    audio[0].volume = .30;
	    audio[0].play();
	    playlist.find('a').click(function(e){
	        e.preventDefault();
	        link = $(this);
	        current = link.parent().index();
	        run(link, audio[0]);
	    });
	    audio[0].addEventListener('ended',function(e){
	        current++;
	        if(current == len){
	            current = 0;
	            link = playlist.find('a')[0];
	        }else{
	            link = playlist.find('a')[current];    
	        }
	        run($(link),audio[0]);
	    });
	}
	function run(link, player){
	        player.src = link.attr('data-link');
	        par = link.parent();
	        par.addClass('active').siblings().removeClass('active');
	        audio[0].load();
	        audio[0].play();
	}
}
Template.listmp3.helpers({
	displaymp3:function(){
		var id = this._id;
		var bySinger = Session.get("LIST_MP3_SINGER");
		var byAlbum = Session.get("LIST_MP3_ALBUM");
		console.log("BY_SINGER="+bySinger);
		console.log("BY_ALBUM="+byAlbum);
		if(bySinger){
			return song.find({singer:bySinger}).map(function(document, index){
			    document.index = index+1;
			    return document;
			});
		}else{
			return song.find({vol:byAlbum}).map(function(document, index){
			    document.index = index+1;
			    return document;
			});
		}
	},
	getmp3:function(file){
		var img = images.findOne({_id:file});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
	player:function(){
		var id = this._id;
		var file = song.findOne({singer:id}).link;
		// console.log("MYFILE="+file);
		var play = Session.get("MP3_LIST");
		console.log("MYFILE="+play);
		if(play){
			return play;		}
		else{
		 	return file;
		}
	},
	getsinger:function(singerId){
		//console.log("MYSINGER="+singerId);
		return singer.findOne({_id:singerId}).ename;
	},
	getalbum:function(id){
		return album.findOne({_id:id}).name;
	},
	getvol:function(id){
		return album.findOne({_id:id}).name;
	},
	singerImage:function(singerId){
		var id = singer.findOne({_id:singerId}).imageId;
		var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return "/uploads/"+img.copies.images.key;
        }else{
            return "/images/album_default.jpg";
        }
	}
});
Template.listmp3.events({
	"click #play-select":function(e){
		Session.get("MP3_LIST");
		var player=document.getElementById('player');
	    var sourceOgg=document.getElementById('player');
	    var sourceMp3=document.getElementById('player');
	    var value = $(e.currentTarget).attr("data-value");//$(this).attr('data-value');
	    //alert(value);
	    sourceOgg.src= value;
	    sourceMp3.src= value;
	    
	   	player.load(); //just start buffering (preload)
	   	player.play(); //start playing
	}
});