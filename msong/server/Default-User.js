Meteor.startup(function() {
    if(Meteor.users.find().count() == 0) {
        var users = [
            {name:"kimyen",email:"kimyen@admin.com",roles:['Admin']},
            {name:"rosoty",email:"rosoty@admin.com",roles:['Admin']}
        ];
        _.each(users, function (user) {
            var id;
            id = Accounts.createUser({
                email: user.email,
                password: "admin@abcd",
                profile: { username: user.name }
            });
            Roles.addUsersToRoles(id, user.roles);
        });
    }
});