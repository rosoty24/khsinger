Meteor.methods({
    addUser:function(email,username,password,mySelect){
        targetUserId=Accounts.createUser({
            email: email,
            password: password,
            profile:{
              username:username
            }
       });
      Roles.setUserRoles(targetUserId, [mySelect])
   },
   deleteUser: function (id) {
      return Meteor.users.remove(id);
   },
   edituser: function(id,email,username,mySelect) {
        var attr={
            emails:[{address: email,verified: "false"}],
            profile:{
              username:username
            },
            roles:[mySelect]
        }
        return Meteor.users.update({_id:id},{$set: attr});
    }
});