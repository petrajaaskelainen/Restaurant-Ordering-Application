//============================================================================
// Name        : drop.js
// Author      : Hafiz Areeb Asad, ....
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 18th Febraury, 2019
// Last updated: 
// Description : Implements dragndrop functionality, some functions are taken from
//               Bar2 example   
// Requires
// Known Issues: 
//=============================================================================
//
// A standard function. If you don't want any "extras", just use this
// as it is. It will prevent the default behaviour, which is not to accept
// any drops.
//
function allowDrop(ev) {
    ev.preventDefault(); // This makes the item accept drop actions.
}

// A standard function. It packages the ID of the source into the data
// transfer package. The type of the transferred data is pure text.
//
function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}



// The drop function determines what happens when you drop the source item
// on the target. You can define any kind of action that you want to
// incorporate.
//
// All information about the drop event is kept in an object that is received upon dropping.
// The ev argument is used throughout the drop function.
//
function drop(ev) {

    // The default action is to not accept drops, så
    ev.preventDefault();
    //ev.stopPropagation(); Not sure what it does

    console.log(ev);

    //if(ev.target.id === "checkoutCart"){

    // This allows for copying menu items, rather than moving them.
    // Comment out this line to see the difference.
    //
    ev.dataTransfer.dropEffect = "copy";

    var data = ev.dataTransfer.getData("id"); // Get the data from the transfer...

    // If we use .cloneNode(true) the dragging results in a cloned copy, rather than
    // an actual move of the source. This is important when we use the dragged item as
    // an example, rather than as an individual object.
    //
    var nodeCopy = document.getElementById(data).cloneNode(true);

    nodeCopy.id = "cartItem" + data.substr(data.length - 1);  // We cannot use the same ID. Ideally we should generate the new ID with a
                            // random or incremental number. This is left as an exercise...
                            //

    nodeCopy.draggable = "false"; // The new element is set as being not draggable.
    
    var nodeID = "#" + nodeCopy.id;

    if($(nodeID).length === 0) {
        //if this doesn't exist then add
        ev.target.appendChild(nodeCopy);
        document.getElementById(nodeCopy.id).ondragstart = function() { return false; };
        document.getElementById(nodeCopy.id).drop = function() { return false; };
        document.getElementById(nodeCopy.id).ondragover = function() { return false; };
        document.getElementById(nodeCopy.id).ondragenter = function() { return false; };

        

        $(nodeID).addClass("cartItemsList");
        //$(nodeID + "span .category").remove();
        $(nodeID).find('.alcoholStrength').remove();
        $(nodeID).data("quantity", 1);
        $(nodeID).append("<span class='cartPlusButtonSpan'>"+ "<button class='cartItemsPlusButton'>"+ "+"+'</button>' +'</span>');
        $(nodeID).append("<span class='quantity'>"+ 1 +'</span>');
        $(nodeID).append("<span class='cartMinusButtonSpan'>"+ "<button class='cartItemsMinusButton'>"+ "-"+'</button>' +'</span>');
        $(nodeID).append("<span class='cartRemoveSpan'>"+ "<button class='cartItemsRemoveButton'>"+ "Remove"+'</button>' +'</span>');

        //console.log( $(nodeID).data("quantity"));
    }
    else {

        var itemQuantity = $(nodeID).data("quantity") + 1;
        var itemPrice = parseInt($(nodeID).data("cart-listing-price"));
        var totalPrice = itemPrice * itemQuantity;
        
        $(nodeID).data("quantity", itemQuantity);           // set and save new value
        $(nodeID).find(".quantity").text(itemQuantity);     // set value for view
        $(nodeID).find(".price").text( totalPrice );        // set value for view

    } 

    addCartItemListeners();
   

    // Get the ID of the target (the order).
    var tempid = "#" + ev.target.id;
    
    var sum = sumCartTotal();
    
    $("#checkoutTotal").text("Total: " + sum + " kr.");
    //}

}


function sumCartTotal(){

    var sum = 0;
    var cartList = $(".cartItemsList");
    
    $(".cartItemsList").each(function(){
        var val = parseInt($(this).data('cart-listing-price')) * parseInt($(this).data('quantity'));
           sum += val;
       });
       //console.log("hey hey");

     //console.log("sum = " + sum);
     return sum;
}



function addCartItemListeners(){

    $('.cartItemsRemoveButton').on('click', function(){
        var parent_id = $(this).parent().parent().attr('id');
        console.log(parent_id);
        
        $("#" + parent_id).remove();
        
        var sum = sumCartTotal();
        $("#checkoutTotal").text("Total: " + sum + " kr.");
    })

    $('.cartItemsPlusButton').on('click', function(){
        var parent_id = $(this).parent().parent().attr('id');
        console.log(parent_id);
        
        var nodeID = "#" + parent_id;
        var itemQuantity = $(nodeID).data("quantity") + 1;
        var itemPrice = parseInt($(nodeID).data("cart-listing-price"));
        var totalPrice = itemPrice * itemQuantity;
        
        $(nodeID).data("quantity", itemQuantity);           // set and save new value
        $(nodeID).find(".quantity").text(itemQuantity);     // set value for view
        $(nodeID).find(".price").text( totalPrice );        // set value for view

        var sum = sumCartTotal();
        $("#checkoutTotal").text("Total: " + sum + " kr.");
    })

    $('.cartItemsMinusButton').on('click', function(){
        var parent_id = $(this).parent().parent().attr('id');
        console.log(parent_id);
        
        var nodeID = "#" + parent_id;
        if($(nodeID).data("quantity") >= 1){
            var itemQuantity = $(nodeID).data("quantity") - 1;
            var itemPrice = parseInt($(nodeID).data("cart-listing-price"));
            var totalPrice = itemPrice * itemQuantity;
        
            $(nodeID).data("quantity", itemQuantity);           // set and save new value
            $(nodeID).find(".quantity").text(itemQuantity);     // set value for view
            $(nodeID).find(".price").text( totalPrice );        // set value for view

            var sum = sumCartTotal();
            $("#checkoutTotal").text("Total: " + sum + " kr.");
        }    
    })



}




// ===================================================================================================================
// END OF FILE
// ===================================================================================================================

