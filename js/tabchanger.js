// JavaScript Document

$(document).ready(function(){
	
$("#loginbtn").click(function(){
    $("#login").hide();
	$("#checkout").show();
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