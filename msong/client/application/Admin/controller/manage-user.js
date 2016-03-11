Template.adduser.events({
    'click #btnuser': function(e,tlp){
        e.preventDefault();
        var username = tlp.$('#username').val();
        var email = tlp.$('#email').val();
        var password = tlp.$('#password').val();
        var mySelect = tlp.$('#mySelect').val();
        // alert(mySelect);
        Meteor.call('addUser',email,username,password,mySelect,function(error){
            if(error){console.log("Error add user"+error.reason())}
            else{
                Router.go('/admin/manageuser');
            }
        });
    }
});
Template.adduser.helpers({
    getRoles:function(){
        var result= Meteor.roles.find({});
        console.log("My Role :"+JSON.stringify(result));
        return result;
        console.log("MY ROLES IS "+result);

    }
});

Template.manageuser.helpers({
    getManageuser:function(){
        var a = Session.get("count");
        a++;
        return Meteor.users.find({});
        //return allUser;
    },
    userRole:function(){
        return Meteor.roles.find();
    },
    perm:function(roles){
        return roles[0];
    },
    checkAdmin:function(roles){
        var position = roles[0];
        if(position == "Admin")
            return "disabled";
        else
            return false;
    }
});
Template.manageuser.events({
    'click #remove': function(e){
        e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("deleteUser",id,function(error){
                if(error){console.log("delete user error"+error.reason())}
                else{
                    Router.go('/admin/manageuser');
                }
            });
        }
    }
});

Template.edituser.events({
    'click #edituser': function(e){
        e.preventDefault();
        var id = this._id;
        var username = $('#username').val();
        var email = $('#email').val();
        var mySelect = $('#mySelect').val();
        Meteor.call('edituser',id,email,username,mySelect,function(err){
            if (err) {console.log("edituser error"+err.reason())}
            else{
                 Router.go('/admin/manageuser');
            }
        });
    }
});
Template.edituser.helpers({
    getRoles:function(){
        var result = Meteor.roles.find({});
        return result;
    },
    position: function(posit){
        return posit[0];
    }
});