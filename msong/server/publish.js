Meteor.publish("album",function(){
	return album.find({});
});
Meteor.publish("singer",function(){
	return singer.find({});
});
Meteor.publish('images', function (){ 
  	return images.find({});
});
Meteor.publish('mp3', function (){ 
  	return mp3.find({});
});
Meteor.publish('user', function (){ 
  	return users.find({});
});
Meteor.publish('roles', function (){ 
  	return roles.find({});
});
Meteor.publish('songList', function (skipCount){ 
  	return song.find({},{limit:50,skip:skipCount});
});