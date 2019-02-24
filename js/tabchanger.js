// JavaScript Document

$(document).ready(function(){
$("#loginbtn").click(function(){
    $("#login").hide();
	$("#menulist").show();
	$("#checkout").show();
  });
});

$(document).ready(function(){
$("#checkoutbtn").click(function(){
    $("#menulist").hide();
	$("#filterColumn").hide();
	$("#confirmPurchase").show();
  });
});

$(document).ready(function(){
$("#confirmbtn").click(function(){
    $("#confirmPurchase").hide();
	$("#checkout").hide();
	$("#orderPlaced").show();
  });
});

$(document).ready(function(){
$("#backtomenu").click(function(){
    $("#orderPlaced").hide();
	$("#filterColumn").show();
	$("#menulist").show();
  });
});