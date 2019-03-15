//============================================================================
// Name        : language.js
// Author      : Hafiz Areeb Asad, Petra Jaaskelainen, Ridhi Agrawal
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 17th Febraury, 2019
// Last updated: 
// Description : Creates Menu Items List on index.html page.  
// Requires loader.js, Beverges.js and  index.html
//=============================================================================




$(document).ready(function(){
    

//
    var beverges = allBeverages().slice(1,30);
    //console.log(beverges.slice(1,20));
    
   console.log(beverges[5].name);
    
    
    function pad2(number) {
        return (number < 10 ? '0' : '') + number
     }
    
    // ===================================================================================================================
    // The function returns all menu drinks strings (created as divs) of a certain type (given as argument).
    //
    function getDrinks(type, arr) {
    
        // The collection variable
        //
        var out = "";
    
        // Go through the array and collect all the items of the desired type.
        //
        for (var i = 0; i < arr.length; i++) {
    
            // if the item is of the desired type, then we add the HTML string to the collection variable.
            // Otherwise we skip to the next item.
            //
            //if (arr[i].type == type) {
       
            out += '<div id="' + "menuitem" + pad2(i) + '" class="menuItemList"  draggable="true" ondragstart="drag(event)"' 
                    + 'data-cart-listing-price="' + arr[i].price + '" ' 
                    + 'data-cart-listing-id="' + arr[i].id + '" ' 
                    + 'data-cart-listing-name="' + arr[i].name +
                '" '+ 'data-cart-listing-alcohol="' + arr[i].alcohol +'" >'
                    + ' <span class="name">' + arr[i].name + '</span>'
                    + ' <span class="alcoholStrength">' + arr[i].alcohol + '</span>'
                    + ' <span class="price">' + arr[i].price + '</span>' 
                    + '</div>';
            //}
        }
        // Once we are finished we return the resulting HTML string containing all the menu items for the desired menu.
        //
        return out;
    }









$(getDrinks(beverges[0].category, beverges)).appendTo("#menulist");
//document.getElementById('div4').appendChild(makeUL(beverges));

$("#checkoutTotal").text("Total: " + 0 + "kr.");

function sortByLowPrice(){
    var divList = $(".menuItemList");
    divList.sort(function(a, b){ return $(a).data("cart-listing-price")-$(b).data("cart-listing-price")});

    $("#menulist").html(divList);
}


function sortByHighPrice(){
    var divList = $(".menuItemList");
    divList.sort(function(a, b){ return $(a).data("cart-listing-price")-$(b).data("cart-listing-price")});

    $("#menulist").html(divList);
}
    



//function sortByAlcohol(){
    //var divList = $(".menuItemList");
    //divList.sort(function(a, b){ return $(a).data("cart-listing-alcohol")-$(b).data("cart-listing-alcohol")});

   // $("#menulist").html(divList);
//} 

function sort(){
    var divList = $(".menuItemList");
    divList.sort(function(a, b){ return $(a).data("cart-listing-price")-$(b).data("cart-listing-price")});

    $("#menulist").html(divList);
}

sort();

});