/**
 * 
 */
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
    
    //console.log(nodeCopy);
    ev.target.appendChild(nodeCopy);

    $("#" + nodeCopy.id).addClass("cartItemsList");
    document.getElementById(nodeCopy.id).ondragstart = function() { return false; };
    document.getElementById(nodeCopy.id).ondrop = function() { return false; };
    


    // Get the ID of the target (the order).
    //
    var tempid = "#" + ev.target.id;
    
    var sum = sumCartTotal();
    
    $("#checkoutTotal").text("Total: " + sum + " kr.");

}


function sumCartTotal(){

    var sum = 0;
    var cartList = $(".cartItemsList");
    
    $(".cartItemsList").each(function(){
        var val = parseInt($(this).data('cart-listing-price'));
           sum += val;
       });
    
     //console.log("sum = " + sum);
     return sum;
}


// ===================================================================================================================
// END OF FILE
// ===================================================================================================================

