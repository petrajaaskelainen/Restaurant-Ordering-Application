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
							let userObj = userDet;
							sessionStorage.setItem('user', JSON.stringify(userObj));  
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
		
		$("#one").css('background', 'yellow');
		$("#two").css('background', '#2b2b2b');
		
		
		let userDetails =	JSON.parse(sessionStorage.getItem('user'));

		//userDetails.account //This is the user Credit I need some id to change text
});
	
	
	
	$("#confirmbtn").click(function(){
	
		$("#orderPlaced").show();	
		$("#confirmPurchase").hide();
		$("#two").css('background', '#2b2b2b');
		$("#three").css('background', '#2b2b2b');
		
		if(sessionStorage.getItem('cart-customer') !== null && JSON.parse(sessionStorage.getItem('cart-customer')).items.length >= 1 ){

			let cartTemp = JSON.parse(sessionStorage.getItem('cart-customer'))
			let userDetails =	JSON.parse(sessionStorage.getItem('user'));

			let newTransacObj;
			let beer_ids_quantity_Temp = [];
			let total = sumCartTotal();
			let userNewCredit = userDetails.account - total;

			changeBalance(userDetails.userName, userNewCredit);
			cartTemp.items.forEach((items, index, array) => {
					
				changeBevergesQuantity(items.drinkDBID, items.quantity);

					let tempObj = {
						"id": items.drinkDBID,
						"quantity": items.quantity
					}
					beer_ids_quantity_Temp.push(tempObj);
			});


			newTransacObj = {
				"transaction_id": getNewTransactionID(),
				"user_id": userDetails.userId,
				"total_price": total,
				"beer_ids_quantity":  beer_ids_quantity_Temp
			}
		
			saveNewTransaction(newTransacObj);
			
		}
	
	});	

	$("#backtomenu").click(function(){
		
		$("#cartcontent").show();
		$("#menu").show();
		$("#login").show();
    	$("#orderPlaced").hide();
		$("#checkout").hide();		
	
	});
	
});

//Function for changing the site tabs.
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}