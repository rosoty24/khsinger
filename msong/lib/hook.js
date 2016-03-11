var IR_BeforeHooks = {
    checkLogin:function(pause){
      if (!Roles.userIsInRole(Meteor.userId(), ['Admin'])) {
          this.render('login');
          pause();
      }else{
          this.next();
      }
    }
};
Router.onBeforeAction(IR_BeforeHooks.checkLogin, {
    only: [
        'dashboard',
        'categories',
        'addcategories',
        'singer',
        'addsinger',
        'editsinger',
        'addalbum',
        'album',
        'editalbum',
        'addsong',
        'allsong',
        'editsong',
        'adduser',
        'manageuser',
        'edituser'  
    ]
  //except: ['admin','categories','login','register','projectlist','search','project','tage'] 
});
