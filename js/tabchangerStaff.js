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
		$("#confirmPurchase").show();
		$("#menu").hide();	 
	
	});
	//When user clicks confirmbtn, the confirmpurchase is hidden and the orderplaced is shown.		
	$("#confirmbtn").click(function(){
		$("#orderPlaced").show();	
		$("#confirmPurchase").hide();
	
	});	
	//When user clicks backtomenu, the menu and ordering tab are shown and the orderplaced is hidden.	
	$("#backtomenu").click(function(){
		$("#menu").show();
		$("#orderPlaced").hide();	
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