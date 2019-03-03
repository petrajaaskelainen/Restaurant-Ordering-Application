//============================================================================
// Name        : drop.js
// Author      : Hafiz Areeb Asad, ....
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 18th Febraury, 2019
// Last updated: 
// Description : Implements dragndrop functionality, some functions are taken from
//               Bar2 example   
// Requires    : index.html, jquery API 
// Known Issues: Sometimes drops on the children elements of the Target Parent.
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

   // console.log(ev);

    //if(ev.target.id === "checkoutCart"){

    // This allows for copying menu items, rather than moving them.
    // Comment out this line to see the difference.
    //
    ev.dataTransfer.dropEffect = "copy";

    var data = ev.dataTransfer.getData("id"); // Get the data from the transfer...
    var dataID = ev.dataTransfer.getData("cart-listing-id"); // Get the data from the transfer...
    //console.log(dataID);

    // If we use .cloneNode(true) the dragging results in a cloned copy, rather than
    // an actual move of the source. This is important when we use the dragged item as
    // an example, rather than as an individual object.
    //
    var nodeCopy = document.getElementById(data).cloneNode(true);

    nodeCopy.id = "cartItem" + data.substr(data.length - 2);  // We cannot use the same ID. So, made the new id with the ID number of menu items.

    nodeCopy.draggable = "false"; // The new element is set as being not draggable.
    //console.log(nodeCopy); 
    //console.log(nodeCopy.getAttribute("data-cart-listing-id")) // Data("cart-listing-id"))

    if ( sessionStorage.getItem('cart') === null)  {

        let cart = {
            "items": [
                {
                    "dbItemID": nodeCopy.getAttribute("data-cart-listing-id"),
                    "menuItemID":data ,
                    "cartItemID" : nodeCopy.id,
                    "name": nodeCopy.getAttribute("data-cart-listing-name"),
                    "price": nodeCopy.getAttribute("data-cart-listing-price") ,
                    "quantity": 1
                }

            ]}
        sessionStorage.setItem('cart', JSON.stringify(cart));
        //var cart2 = JSON.parse(sessionStorage.getItem('cart'));
        //console.log(cart2);
        console.log("First time Cart Message")
        addItemInUndo(cart.items[0], "add");  

    }
    else{

        let cart1 = JSON.parse(sessionStorage.getItem('cart'));
        //console.log(cart1);
        
        let checkItem = cart1.items.find(items => items.dbItemID === nodeCopy.getAttribute("data-cart-listing-id"));
        //console.log("CheckItem: " + checkItem);

        if (checkItem === undefined){
            var itemobjtemp =  {
                "dbItemID": nodeCopy.getAttribute("data-cart-listing-id"),
                "menuItemID":data ,
                "cartItemID" : nodeCopy.id,
                "name": nodeCopy.getAttribute("data-cart-listing-name"),
                "price": nodeCopy.getAttribute("data-cart-listing-price") ,
                "quantity": 1
            }

            cart1.items.push(itemobjtemp);
            console.log(cart1);
            addItemInUndo(itemobjtemp, "add");
            sessionStorage.setItem('cart', JSON.stringify(cart1));
            //console.log(cart2);
        }
        else{
            cart1.items.forEach((items, index, array) => {
                if (items.dbItemID === nodeCopy.getAttribute("data-cart-listing-id")){

                    items.quantity +=1;
                }
               // console.log(element.dbItemID); // 100, 200, 300
               // console.log(index); // 0, 1, 2
               // console.log(array); // same myArray object 3 times
            });

           // cart1.items.push(itemobjtemp);
            console.log(cart1);
            sessionStorage.setItem('cart', JSON.stringify(cart1));

            





        }    

    }    
    

    drawCart();




    
    var nodeID = "#" + nodeCopy.id;
    /*

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
        $(nodeID).append("<span class='cartRemoveSpan'>"+ "<button class='cartItemsRemoveButton'>"+ "X"+'</button>' +'</span>');

        $(nodeID).addClass(".menuItemDrop");


        let backgroundColor = $(nodeID).css('background');  // store original background
        $(nodeID).css('background', 'yellow');              // change element background
        setTimeout(function() {
            $(nodeID).css('background', backgroundColor);   // change it back after ...
        }, 600);                                            // waiting few millisecond



        //console.log( $(nodeID).data("quantity"));
    }
    else {

        var itemQuantity = $(nodeID).data("quantity") + 1;
        var itemPrice = parseInt($(nodeID).data("cart-listing-price"));
        var totalPrice = itemPrice * itemQuantity;
        
        $(nodeID).data("quantity", itemQuantity);           // set and save new value
        $(nodeID).find(".quantity").text(itemQuantity);     // set value for view
        $(nodeID).find(".price").text( totalPrice );        // set value for view

    
        let backgroundColor = $(nodeID).css('background');  // store original background
        $(nodeID).css('background', 'yellow');              // change element background
        setTimeout(function() {
            $(nodeID).css('background', backgroundColor);   // change it back after ...
        }, 600);   
    
    
    } 
    */

   


    addCartItemListeners();
   

    let backgroundColor = $(nodeID).css('background');  // store original background
    $(nodeID).css('background', 'yellow');              // change element background
     setTimeout(function() {
        $(nodeID).css('background', backgroundColor);   // change it back after ...
     }, 600);  

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



function drawCart(){

    let cart = JSON.parse(sessionStorage.getItem('cart'));
    
    var out = "";
    
    // Go through the array and collect all the items of the desired type.
    for (var i = 0; i < cart.items.length; i++) {


        var cartID = cart.items[i].cartItemID;
        var cartName = cart.items[i].name;
        var cartPrice = cart.items[i].price;
        var cartQuantity = cart.items[i].quantity;
   
        out += '<div id="' + cartID + '" class="menuItemList cartItemsList menuItemDrop" ' 
                + 'data-cart-listing-price="' + cartPrice + '" ' 
                + 'data-quantity="' + cartQuantity + '" >'
                + '<span class="name">' + cartName + '</span>'
                + '<span class="price">' + cartPrice + '</span>' 
                + '<span class="cartPlusButtonSpan">' + "<button class='cartItemsPlusButton'>"+ "+"+'</button>' +'</span>'
                + '<span class="quantity">'+ cartQuantity +'</span>'
                + '<span class="cartMinusButtonSpan">'+ "<button class='cartItemsMinusButton'>"+ "-"+'</button>' +'</span>'
                + '<span class="cartRemoveSpan">'+ "<button class='cartItemsRemoveButton'>"+ "X"+'</button>' +'</span>'
                + '</div>';
    
    }


    $("#checkoutCart").html(out);

    sumCartTotal();

}


function addCartItemListeners(){

    //Listens if remove button of cart item is clicked.
    $('.cartItemsRemoveButton').on('click', function(){
        var parent_id = $(this).parent().parent().attr('id');
        console.log(parent_id);
        
        $("#" + parent_id).remove();
        
        var sum = sumCartTotal();
        $("#checkoutTotal").text("Total: " + sum + " kr.");
    })

    //Listens if add button of cart item is clicked.
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

    //Listens if minus button of cart item is clicked.
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