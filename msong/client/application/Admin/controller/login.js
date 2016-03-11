Template.login.events({
	'submit #signupform': function(event){
    	event.preventDefault();
    	var email=$("#email").val();
    	var username =$('#username').val();
		var password = $('#password').val();
		var rerole = 'member';
		var msg = '';
		if( username == '' || email=='' || password ==''){
			if( username == '' )
				msg += 'username is required.';
			if( email == '' )
				msg += 'email is required.';
			if( password == '' )
				msg += 'password is required.';
			
			Session.set("registerError", msg );
		}
		else{
			//alert(firstname+lastname+email+password);
			Meteor.call('regUser',email, username, password, rerole, function(err){
				if(err){
					console.log(err.reason);
				}else{
					alert("successfully");
				}
			});
		}
    	
    },
	'click #btn-login':function(e){
		e.preventDefault();
		var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		/*$('.close').click();*/
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				alert("successfully");
				Router.go('/admin/dashboard');
			}
		});
    }
});

Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        //alert('logout!!!');
        Meteor.logout();
        Router.go('/login');
    }
});