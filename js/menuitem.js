//============================================================================
// Name        : language.js
// Author      : Hafiz Areeb Asad, Petra Jaaskelainen,...
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 19th Febraury, 2019
// Last updated: 
// Description : Creates Menu Items List on index.html page.  
// Requires loader.js, Beverges.js and  index.html
//=============================================================================


var beverges = allBeverages().slice(1,20);
//console.log(beverges.slice(1,20));

console.log(beverges[5].name);


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
        out += '<div id="' + "menuitem" + i + '" class="menuItemList"  draggable="true" ondragstart="drag(event)"' 
                + 'data-cart-listing-price="' + arr[i].price  + '" >' 
                + ' <span  class="name">' + arr[i].name + '</span>'
                + ' <span  class="alcohol">' + arr[i].alcohol + '</span>'
                + ' <span  class="category">' + arr[i].category + '</span>'
                + ' <span  class="price">' + arr[i].price + '</span>' 
                + '</div>';
        //}
    }
    // Once we are finished we return the resulting HTML string containing all the menu items for the desired menu.
    //
    return out;
}

$(document).ready(function(){

$(getDrinks(beverges[0].category, beverges)).appendTo("#menulist");
//document.getElementById('div4').appendChild(makeUL(beverges));

$("#checkoutTotal").text("Total: " + 0 + "kr.");

function sort(){
    var divList = $(".menuItemList");
    divList.sort(function(a, b){ return $(a).data("cart-listing-price")-$(b).data("cart-listing-price")});

    $("#menulist").html(divList);
}

sort();

});
