Meteor.subscribe("album");
Meteor.subscribe("singer");
Meteor.subscribe('images');
Meteor.subscribe('mp3');
Meteor.subscribe('user');
Meteor.subscribe('roles');
Deps.autorun(function(){
	Meteor.subscribe('songList',Session.get("SKIP_SONG"));
});