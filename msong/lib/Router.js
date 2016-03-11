Router.configure({
    layoutTemplate: 'mainLayout'
});
Router.route('/program', {
    name: 'program'
});
Router.route('/', {
    name: 'home'
});
Router.route('/page', {
    name: 'page'
});
Router.route('/video', {
    name: 'video'
});
Router.route('/mp3', {
    name: 'mp3'
});
Router.route('/menu', {
    name: 'menu'
});
Router.route('/singermp3', {
    name: 'singermp3'
});
Router.route('/test', {
    name: 'test'
});

//============================= FRONTEND PAGE ============================//

Router.route('/listsinger', {
    name: 'listsinger'
});
Router.route('/listmp3/:_id', {
    name: 'listmp3',
    data:function(){
        return singer.findOne({_id:this.params._id});
    }
});
Router.route('/listalbum/:id', {
    name: 'listalbum',
    data:function(){
        return album.findOne({_id:this.params.id});
    }
});

//============================= ADMIN PAGE ============================//

Router.route('/admin/dashboard', {
    name: 'dashboard'
});
Router.route('/admin/categories', {
    name: 'categories'
});
Router.route('/admin/addcategories', {
    name: 'addcategories'
});
Router.route('/admin/singer', {
    name: 'singer'
});
Router.route('/admin/addsinger', {
    name: 'addsinger'
});
Router.route('/admin/editsinger/:_id', {
    name: 'editsinger',
    data:function(){
        return singer.findOne({_id: this.params._id});
    }
});

//============ USERS ===============//

Router.route('/login', {
    name: 'login'
});
Router.route('/register', {
    name: 'register'
});
Router.route('/admin/adduser',{
    name: 'adduser'
});
Router.route('/admin/manageuser',{
    name: 'manageuser'
});
Router.route('/admin/edituser/:_id',{
    name: 'edituser',
    data: function(){
        return users.findOne({_id: this.params._id});
    }
});

//============ ALBUME ===============//

Router.route('/admin/addalbum', {
    name: 'addalbum'
});
Router.route('/admin/album', {
    name: 'album'
});
Router.route('/admin/editalbum/:_id', {
    name: 'editalbum',
    data:function(){
        return album.findOne({_id: this.params._id});
    }
});

//============ SONG ===============//

Router.route('/admin/addsong', {
    name: 'addsong'
});
Router.route('/admin/allsong', {
    name: 'allsong'
});
Router.route('/admin/editsong/:_id', {
    name: 'editsong',
    data:function(){
        return song.findOne({_id: this.params._id});
    }
});