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
		
		$("#one").css('background', '#2b2b2b');
		$("#two").css('background', 'darkturquoise');
		$("#three").css('background', 'darkturquoise');

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
							$("#logoutbtn").show();

							let userObj = userDet;
							sessionStorage.setItem('user', JSON.stringify(userObj)); 
							$("#checkoutCartCreditValue").text(userObj.account + " kr.");
							$("#checkoutCartPriceValue").text("0" + " kr."); 
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

	//When user clicks checkoutbtn, the menu is hidden and the confirmpurchase is shown.	
	$("#checkoutbtn").click(function(){
	
		
		if(sessionStorage.getItem('cart-customer') !== null && JSON.parse(sessionStorage.getItem('cart-customer')).items.length >= 1 ){
			//$("#progress").show();
			$("#menu").hide();
			$("#confirmPurchase").show();
		
		
			$("#two").css('background', '#2b2b2b');
			$("#one").css('background', 'darkturquoise');
		}
		else{ // Show Cart warning Message 
			$("#checkoutWarningText").show();
			$("#checkoutWarningText").fadeOut(300)
										.fadeIn(300)
										.fadeOut(300)
										.fadeIn(300)
										.fadeOut(300)
										.fadeIn(300)
										.fadeOut(300)
										.fadeIn(300)
										.fadeOut(300)
										.fadeIn(300).hide(0);
			
		}
		

		
	});

  	// Back Button, show Menu and hide confirm purchase section
	$("#backbtn").click(function(){
	
		//$("#progress").show();
		$("#menu").show();
		$("#confirmPurchase").hide();
		$("#two").css('background', 'darkturquoise');
		$("#one").css('background', '#2b2b2b');

		
	});
	
	
	// Confirm Purchase Button
	$("#confirmbtn").click(function(){
	
		if(sessionStorage.getItem('cart-customer') !== null && JSON.parse(sessionStorage.getItem('cart-customer')).items.length >= 1 ){

			let cartTemp = JSON.parse(sessionStorage.getItem('cart-customer'))
			let userDetails =	JSON.parse(sessionStorage.getItem('user'));

			let newTransacObj;
			let beer_ids_quantity_Temp = [];
			let total = sumCartTotal();
			let userNewCredit = userDetails.account - total;

			changeBalance(userDetails.userName, userNewCredit);
			cartTemp.items.forEach((items, index, array) => {
					
				changeBevergesQuantity(items.drinkDBID, items.quantity); // Make changes in database

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
			emptyCartView();
		}

		$("#orderPlaced").show();	
		$("#confirmPurchase").hide();
		//$("#cartcontent").hide();
		$("#checkout").hide();
		$("#logoutbtn").hide();

		
		$("#two").css('background', 'darkturquoise');
		$("#three").css('background', '#2b2b2b');
	
	});	

	//When user clicks backtomenu, the menu and ordering tab are shown and the orderplaced is hidden.	
	$("#backtomenu").click(function(){
		
		$("#cartcontent").show();
		$("#progress").hide();
		$("#logoutbtn").hide();
		$("#menu").show();
		$("#login").show();
    	$("#orderPlaced").hide();
		$("#checkout").hide();		
	
	});

	$("#logoutbtn").click(function(){
		
		$("#cartcontent").show();
		$("#progress").hide();
		$("#logoutbtn").hide();
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