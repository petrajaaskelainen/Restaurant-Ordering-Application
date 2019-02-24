// JavaScript Document

$(document).ready(function(){
	
	$('#loginbtn').click(function(){

		var userName = $('#loginUsername').val();   //  Get username from input field (html)         
		var userPass = $('#loginPassword').val();		//  Get password from input field (html)

	 

		if (userName != '' || userPass != ''){ 			// Make sure username and password entered by user are not empty 
		
				var userDet =  userDetails(userName);   // Get user details from database 
				var hash = md5(userPass);               // Convert plain text password to md5 hash.

						if(userName === userDet.userName && hash === userDet.pass){
							$("#login").hide();
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
	$("#content").hide();
	$("#checkoutcontent").hide();
	$("#confirmPurchase").show();
  });
	
$("#confirmbtn").click(function(){
    $("#confirmPurchase").hide();
	$("#orderPlaced").show();
  });	

$("#backtomenu").click(function(){
    $("#orderPlaced").hide();
	$("#checkout").hide();	
	$("#cartcontent").show();
	$("#filterColumn").show();
	$("#menulist").show();
    $("#login").show();
  });
	
});