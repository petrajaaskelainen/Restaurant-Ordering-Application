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
// Known Issues: All fixed, No so far
//=============================================================================

/**
 * This file contains following functions
 * 1.  drawCartView() 
 * 2.  addOrPlusItemInCart(data)
 * 3.  plusQuantityOfItemInCart(cartItemID)
 * 4.  removeItemFromCart(cartItemID)
 * 5.  minusQuantityOfItemInCart(cartItemID)
 * 6.  sumCartTotal() 
 * 7.  addCartItemListeners()
 * 8.  removeCartItemListeners()
 * 9.  allowDrop(ev)
 * 10. drag(ev)
 * 11. drop(ev)
 */

let CART;

if ( document.URL.includes("indexStaff.html") ) {
    CART = "cart-staff";
}
else {
    
    if ( document.URL.includes("indexCustomer.html") )
        CART = "cart-customer";
}
 



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

    var menuID = ev.dataTransfer.getData("id"); // Get the data from the transfer...

    // If we use .cloneNode(true) the dragging results in a cloned copy, rather than
    // an actual move of the source. This is important when we use the dragged item as
    // an example, rather than as an individual object.
    //
    var nodeCopy = document.getElementById(menuID).cloneNode(true);

    nodeCopy.id = "cartItem" + menuID.substr(menuID.length - 2);  // We cannot use the same ID. So, made the new id with the ID number of menu items.
    var nodeID = "#" + nodeCopy.id;

    //nodeCopy.draggable = "false"; // The new element is set as being not draggable.
    
    let data = {
        id: menuID,
        quantity: 1
    }
    
    addOrPlusItemInCart(data);     

    drawCartView();

   

    let backgroundColor = $(nodeID).css('background');  // store original background
    $(nodeID).css('background', 'yellow');              // change element background
     setTimeout(function() {
        $(nodeID).css('background', backgroundColor);   // change it back after ...
     }, 600);  

    // Get the ID of the target (the order).
    var tempid = "#" + ev.target.id;
  

}


function sumCartTotal(){

    let sum = 0;
    let cartTemp = JSON.parse(sessionStorage.getItem(CART));

    cartTemp.items.forEach((items, index, array) => {
            let val = items.quantity * items.price;
            sum += val;
    });

    return sum;
}




/**
 * 
 * @param {Id of the menu} menuID 
 * Example: menuItem01, menuItem02, ...
 * 
 * @Description This function adds the item in the cart.
 *              You have to explicitly call drawCartView() to update the view on front-end.
 */
function addOrPlusItemInCart(data, addInUndo = true){
               
    if ( sessionStorage.getItem(CART) === null)  {

        let cart = {"items": []};

        
        sessionStorage.setItem(CART, JSON.stringify(cart));
    
    }
    
    console.log(data);
    let menuID = data.id;
    let itemQuantity = data.quantity;
    
    let menuIDStr = "#" + menuID;  
    let cartItemID = "cartItem" + menuID.substr(menuID.length - 2); 
    let drinkDBID = $(menuIDStr).data("cart-listing-id").toString();
    let cartTemp = JSON.parse(sessionStorage.getItem(CART));
    let action = "add";    
    
    let checkItem = cartTemp.items.find(items => items.drinkDBID === drinkDBID);
    //console.log("CheckItem: " + checkItem);

    if (checkItem === undefined){
        
        let itemObjTemp =  {
            "drinkDBID": drinkDBID, 
            "menuItemID": menuID,
            "cartItemID" : cartItemID,
            "name": $(menuIDStr).data("cart-listing-name"),
            "price": $(menuIDStr).data("cart-listing-price"),
            "quantity": itemQuantity
        }

        cartTemp.items.push(itemObjTemp);
       
    }
    else{
        
        cartTemp.items.forEach((items, index, array) => {
            if (items.drinkDBID === drinkDBID){

                items.quantity +=1;
                itemQuantity = items.quantity;
                action="Plus";
            }
        });

    }        

    
    sessionStorage.setItem(CART, JSON.stringify(cartTemp));
    
    data = {id: cartItemID, quantity: itemQuantity};
    
    if(addInUndo === true){
        addItemInUndo(data ,action, true);
    }
    
    console.log("add or plus items in cart: \n" );
    console.log(cartTemp);

    return data;

}


function plusQuantityOfItemInCart(cartItemID, addInUndo = true){

    let cartTemp = JSON.parse(sessionStorage.getItem(CART));
    let tempQuantity;

    cartTemp.items.forEach((items, index, array) => {
        if (items.cartItemID === cartItemID){
            items.quantity +=1;
            tempQuantity = items.quantity;
        }
    });


    sessionStorage.setItem(CART, JSON.stringify(cartTemp));

    let data = {id: cartItemID, quantity: tempQuantity};

    if(addInUndo === true){
        addItemInUndo(data ,"Plus", true);
    }    
}




function minusQuantityOfItemInCart(cartItemID, addInUndo = true){

    let cartTemp = JSON.parse(sessionStorage.getItem(CART));
    let tempQuantity;

    cartTemp.items.forEach((items, index, array) => {
        if (items.cartItemID === cartItemID){
           
            if(items.quantity >= 2){
                items.quantity -=1;
            }
        }
    });


    sessionStorage.setItem(CART, JSON.stringify(cartTemp));

    let data = {id: cartItemID, quantity: tempQuantity};

    if(addInUndo === true){
        addItemInUndo(data ,"Minus", true);
    }    
}

function removeItemFromCart(cartItemID,addInUndo = true){

    let menuID; 
    let quantity;
    let toRemoveItemIndex;
    let cartTemp = JSON.parse(sessionStorage.getItem(CART));

    console.log("cartID Remove Function:")
    //console.log(cartID);

    cartTemp.items.forEach((items, index, array) => {
       
        if (items.cartItemID === cartItemID){
          /* USAGE:
            # console.log(items.cartID); // 100, 200, 300
            # console.log(index); // 0, 1, 2
            # console.log(array); // same myArray object 3 times
          */         
            menuID = items.menuItemID;
            quantity = items.quantity;
            toRemoveItemIndex = index;
            console.log("index" + index );
        }
      
    });

    cartTemp.items.splice(toRemoveItemIndex, 1);
    console.log("Remove items in cart: \n" );
    console.log(cartTemp);
    sessionStorage.setItem(CART, JSON.stringify(cartTemp));
    
    let data = {id: menuID, quantity:quantity};

    if(addInUndo === true){
        addItemInUndo(data ,"remove", true);
    } 
    return data;
}





function drawCartView(){

    removeCartItemListeners();

    let cart = JSON.parse(sessionStorage.getItem(CART));
    
    var out = "";
    
    // Go through the array and add all the items.
    for (var i = 0; i < cart.items.length; i++) {


        var cartID = cart.items[i].cartItemID;
        var cartName = cart.items[i].name;
        var cartPrice = cart.items[i].price;
        var cartQuantity = cart.items[i].quantity;
   
        out += '<div id="' + cartID + '" class="menuItemList cartItemsList menuItemDrop" ' 
                + 'data-cart-listing-price="' + cartPrice + '" ' 
                + 'data-quantity="' + cartQuantity + '" >'
                + '<span class="name">' + cartName + '</span>'
                + '<span class="price">' + cartPrice * cartQuantity + '</span>' 
                + '<span class="cartPlusButtonSpan">' + "<button class='cartItemsPlusButton'>"+ "+"+'</button>' +'</span>'
                + '<span class="quantity">'+ cartQuantity +'</span>'
                + '<span class="cartMinusButtonSpan">'+ "<button class='cartItemsMinusButton'>"+ "-"+'</button>' +'</span>'
                + '<span class="cartRemoveSpan">'+ "<button class='cartItemsRemoveButton'>"+ "X"+'</button>' +'</span>'
                + '</div>';
    
    }


    $("#checkoutCart").html(out);
    $("#checkoutTotal").text("Total: " +  sumCartTotal() + " kr.");
   
    let userDetails =	JSON.parse(sessionStorage.getItem('user'));

	let total = sumCartTotal();
	let userNewCredit = userDetails.account - total;
    $("#cartCreditTotal").text("Total Credit: " +  userNewCredit + " kr.");
   

    addCartItemListeners();

}


function removeCartItemListeners(){

    $(".cartItemsPlusButton").off("click");
    $(".cartItemsMinusButton").off("click");
    $(".cartItemsRemoveButton").off("click");
}


function addCartItemListeners(){

    /*Listens if remove button of cart item is clicked.*/
    $('.cartItemsRemoveButton').on('click', function(){
        
        let cartID = $(this).parent().parent().attr('id');
       
        removeItemFromCart(cartID);
        drawCartView();

    })

    /*Listens if add button of cart item is clicked.*/
    $('.cartItemsPlusButton').on('click', function(){
        
        let cartID = $(this).parent().parent().attr('id');
        
        plusQuantityOfItemInCart(cartID);
        drawCartView();
       
    })

    /*Listens if minus button of cart item is clicked.*/
    $('.cartItemsMinusButton').on('click', function(){
       
        let cartID = $(this).parent().parent().attr('id');        
        let nodeID = "#" + cartID;

        if($(nodeID).data("quantity") >= 2){
            minusQuantityOfItemInCart(cartID);
            drawCartView();
        }  

    })



}