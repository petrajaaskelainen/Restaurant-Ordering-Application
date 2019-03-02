//============================================================================
// Name        : tabchanger.js
// Authors     : Hafiz Areeb Asad, Petra Jaaskelainen
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 24th Febraury, 2019
// Last updated: 
// Description : Implements tabchanger and login functionality.  
// Requires 
//=============================================================================


//Execute the inside functions when html document is completely loaded.
$(document).ready(function(){
	
	/* If user clicks on Login Button, then check the username and password (from DB) provided by user.
	   If username & password are correct then show the Checkout Box (Div) and hide login (Div)*/
	$('#loginbtn').click(function(){

		var userName = $('#loginUsername').val();   	//  Get username from input field (html)         
		var userPass = $('#loginPassword').val();		//  Get password from input field (html)

	 
		if (userName != '' || userPass != ''){ 			// Make sure username and password entered by user are not empty 
		
				var userDet =  userDetails(userName);   // Get user details from database 
				//console.log("userDet")
				var hash = md5(userPass);               // Convert plain text password to md5 hash.

						if(userName === userDet.userName && hash === userDet.pass){
							$("#login").hide();
							$("#progress").show();
							$("#checkout").show();
						}
						else{
							 			// if username or password is not correct then display this text
										$('#loginMsg').text("Username OR Password Incorrect!");	
						}
		}
		else{
						//if empty then show
						$('#loginMsg').text("Username OR Password not entered!");
		}
	
	}); 


	$("#checkoutbtn").click(function(){
	
		$("#progress").show();
		$("#confirmPurchase").show();
		$("#menu").hide();	 
	
	});
	
	$("#confirmbtn").click(function(){
	
		$("#orderPlaced").show();	
		$("#confirmPurchase").hide();
	
	});	

	$("#backtomenu").click(function(){
		
		$("#cartcontent").show();
		$("#menu").show();
		$("#login").show();
    	$("#orderPlaced").hide();
		$("#checkout").hide();		
	
	});
	
});