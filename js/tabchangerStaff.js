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


//Executing the functions when html document is completely loaded.
$(document).ready(function(){

	//When user clicks checkoutbtn, the menu is hidden and the confirmpurchase is shown.	
	$("#checkoutbtn").click(function(){
    
    if(sessionStorage.getItem('cart-staff') !== null && JSON.parse(sessionStorage.getItem('cart-staff')).items.length >= 1 ){
			//$("#progress").show();
			$("#menu").hide();
			$("#confirmPurchase").show();
		
		
			//$("#two").css('background', '#2b2b2b');
			//$("#one").css('background', 'darkturquoise');
		}
		else{
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
  
	//When user clicks confirmbtn, the confirm purchase is hidden and the orderplaced is shown.		
	$("#confirmbtn").click(function(){

    if(sessionStorage.getItem('cart-staff') !== null && JSON.parse(sessionStorage.getItem('cart-staff')).items.length >= 1 ){

			let cartTemp = JSON.parse(sessionStorage.getItem('cart-staff'))
			let userDetails =	JSON.parse(sessionStorage.getItem('user'));

			let newTransacObj;
			let beer_ids_quantity_Temp = [];
			let total = sumCartTotal();
			let userNewCredit = userDetails.account - total;

			//changeBalance(userDetails.userName, userNewCredit);
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
				"user_id": "admin",
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
	
  });
  	
	//When user clicks backtomenu, the menu and ordering tab are shown and the orderplaced is hidden.	
	$("#backtomenu").click(function(){
		
		$("#cartcontent").show();
		//$("#progress").hide();
		//$("#logoutbtn").hide();
		$("#menu").show();
		//$("#login").show();
    $("#orderPlaced").hide();
    $("#checkout").show();	
    $("#checkoutCartPriceValue").text("0" + " kr."); 
	
	
  });
  

  // Back Button
	$("#backbtn").click(function(){
	
		//$("#progress").show();
		$("#menu").show();
		$("#confirmPurchase").hide();
		
		
		//$("#two").css('background', 'darkturquoise');
		//$("#one").css('background', '#2b2b2b');

		
	});

  $("#login").click(function(){
		$("#cartcontent").hide();
		//$("#orderPlaced").hide();	
  });

  $("#historyTab").click(function(){
    
    let trans =  allTransactions();     // Get from Database (Model)
    drawPurchaseHistory(trans);         // Make display for Screen (View)
   
    $(":button[id^=show_]").click(function(event) {

      $("#extra_" + $(this).attr('id').substr(5)).slideToggle("medium");

      event.preventDefault();
    })

  });

  


  	
});



function drawPurchaseHistory(trans){


  var out = '<table id="historyT"> <tr> <th>Transaction ID</th> <th>User ID</th> <th>Total Price</th><th>Details</th> </tr>';
    
  // Go through the array and collect all the items of the desired type. 
  //
  for (var i = 0; i < trans.length; i++) {

      
      let outTemp ='<table style="width: 100%;"> <tr> <th>Beer ID</th> <th>Quantity</th></tr>';

        for (let index = 0; index < trans[i].beers.length; index++) {
               outTemp +='<tr>' 
                       + '<td>' + trans[i].beers[index].id + '</td>'
                       + '<td>' + trans[i].beers[index].quantity + '</td>'
                      + '</tr>'
        }

        outTemp += '</table>';
 
      out += '<tr>' 
              + '<td>' + trans[i].transID + '</td>'
              + '<td>' + trans[i].userID + '</td>'
              + '<td>' + trans[i].price + '</td>'
              +  '<td>' + '<button id=' + "show_" + i + '>' + "+" + '</button></td>'
              + '</tr>'
              +
              '<tr  id=' + "extra_" + i+ ' style="display: none;">'
              +'<td colspan="4">'
              //+  '<div>'
              +    outTemp
              //+  '</div>'
              + '</td>'
              +'</tr>'
      //}
  }

  out += '</table>';
  $("#history").html(out);

}



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