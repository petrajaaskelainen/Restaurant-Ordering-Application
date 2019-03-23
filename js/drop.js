//============================================================================
// Name        : drop.js
// Author      : Hafiz Areeb Asad, ....
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 18th Febraury, 2019
// Last updated: 23rd March, 2019
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
 * 9.  emptyCartView()
 * 10.  allowDrop(ev)
 * 11. drag(ev)
 * 12. drop(ev)
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
    
    addOrPlusItemInCart(data);                          // Adds/Plus item in the cart array

    drawCartView();                                     // Draws/adds all the Cart items on the page

   

    let backgroundColor = $(nodeID).css('background');  // store original background
    $(nodeID).css('background', 'SpringGreen');         // change element background
     setTimeout(function() {
        $(nodeID).css('background', backgroundColor);   // change it back after ...
     }, 600);  

    // Get the ID of the target (the order).
    var tempid = "#" + ev.target.id;
  

}

/**
 * This function gets all the items price and quantity
 * from the cart (stored in sessionStorage) and based 
 * on these values, calculates the total price of the cart.
 */
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
    
    //console.log("add or plus items in cart: \n" );
    //console.log(cartTemp);

    return data;

}


/**
 * 
 * @param {} cartItemID: Id of the Cart Item (HTML ID) 
 * @param {*} addInUndo, True/False, Weather to add in Undo OR Not  
 * Description: This function increaments the quantity of a given cart item id. 
 */
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


/**
 * 
 * @param {} cartItemID: Id of the Cart Item (HTML ID) 
 * @param {*} addInUndo, True/False, Weather to add in Undo OR Not  
 * Description: This function decreaments the quantity of a given cart item id. 
 */
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


/**
 * 
 * @param {} cartItemID: Id of the Cart Item (HTML ID) 
 * @param {*} addInUndo, True/False, Weather to add in Undo OR Not  
 * Description: This function removes the quantity of a given cart item id. 
 */
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


/**
 * This function clears the cart array in session storage 
 * and also empties the cart in the view.
 */
function emptyCartView(){

    removeCartItemListeners();

    let cart = JSON.parse(sessionStorage.getItem(CART));
    
    cart = {"items": []};
    
    sessionStorage.setItem(CART, JSON.stringify(cart));


    $("#checkoutCart").empty();
    $("#checkoutCart").append('<span class="tooltiptext" id="checkoutWarningText" hidden><br>Cart is empty</span>');

    $("#checkoutTotal").text("Total: " +  "0" + " kr.");
   

}

/**
 * Description: This function does 5 tasks
 * 1. Removes all old listeners (add/minus/remove button) associated with cart items
 * 2. Creates Cart View (HTML) from the cart (stored in session storage)
 * 3. Adds new listeners (add/minus/remove button)
 * 4. Updates total Sum, and shows on the view
 * 5. Updates the user Credit, and shows on the view 
 */

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
                + '<span class="cartPlusButtonSpan">' + "<button class='cartItemsPlusButton'>"+ "+"+'</button>' +'</span>'
                + '<span class="quantity">'+ cartQuantity +'</span>'
                + '<span class="cartMinusButtonSpan">'+ "<button class='cartItemsMinusButton'>"+ "-"+'</button>' +'</span>'
                + '<span class="price">' + cartPrice * cartQuantity + '</span>' 
                + '<span class="cartRemoveSpan">'+ "<button class='cartItemsRemoveButton'>"+ "X"+'</button>' +'</span>'
                + '</div>';
    
    }


    $("#checkoutCart").html(out);
    $("#checkoutCart").append('<span class="tooltiptext" id="checkoutWarningText" hidden><br>Cart is empty</span>');
    
    let total = sumCartTotal();
    let userDetails =	JSON.parse(sessionStorage.getItem('user'));
    let userNewCredit = userDetails.account - total;


   	$("#checkoutCartPriceValue").text( total + " kr."); //toLocaleString('ar-EG') 
    $("#checkoutCartCreditValue").text(userNewCredit + " kr.");   

    $("#confirmPurchasePriceValue").text( total + " kr."); //toLocaleString('ar-EG') 
    $("#confirmPurchaseCreditValue").text(userNewCredit + " kr.");  

    addCartItemListeners();

}


/**
 * This function removes all the buttons listeners
 * associated with cart items in the view
 */
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
        drawCartView();                     // Draws all the Cart items on the page

    })

    /*Listens if add button of cart item is clicked.*/
    $('.cartItemsPlusButton').on('click', function(){
        
        let cartID = $(this).parent().parent().attr('id');
        
        plusQuantityOfItemInCart(cartID);
        drawCartView();                      // Draws all the Cart items on the page
       
    })

    /*Listens if minus button of cart item is clicked.*/
    $('.cartItemsMinusButton').on('click', function(){
       
        let cartID = $(this).parent().parent().attr('id');        
        let nodeID = "#" + cartID;

        if($(nodeID).data("quantity") >= 2){
            minusQuantityOfItemInCart(cartID);
            drawCartView();                  // Draws all the Cart items on the page
        }  

    })

    /*Listens if empty button of cart item is clicked.*/
    $('#emptyCartBtn').on('click', function(){
       
        emptyCartView();                    // Clear all the cart items

    })



}