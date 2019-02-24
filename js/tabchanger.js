// JavaScript Document

$(document).ready(function(){
	
	$('#loginbtn').click(function(){

		var userName = $('#loginUsername').val();              
		var userPass = $('#loginPassword').val();

	 

		if (userName != '' || userPass != ''){
		
				var userDet =  userDetails(userName);   // jorass 
				var hash = md5(userPass);               // "2063c1608d6e0baf80249c42e2be5804"


						if(userName === userDet.userName && hash === userDet.pass){

							$("#login").hide();
							$("#checkout").show();



						}
						 else{
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