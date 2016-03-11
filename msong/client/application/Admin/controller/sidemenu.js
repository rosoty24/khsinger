Template.sidemenu.events({
	"click #dashboard":function(){
		Router.go("/admin/dashboard");
	},
	"click #album":function(){
		Router.go("/admin/album");
	},
	"click #addalbum":function(){
		Router.go("/admin/addalbum");
	},
	"click #singer":function(){
		Router.go("/admin/singer");
	},
	"click #addsinger":function(){
		Router.go("/admin/addsinger");
	},
	"click #addsong":function(){
		Router.go("/admin/addsong");
	},
	"click #allsong":function(){
		Router.go("/admin/allsong");
	},
	'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/login');
    }
});