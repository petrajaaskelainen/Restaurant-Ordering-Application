//============================================================================
// Name        : undoRedo.js
// Author      : Hafiz Areeb Asad,...
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 02 March, 2019
// Last updated: 
// Description : Implements undo/redo functionality  
// Requires drop.js and  index.html
//=============================================================================





function  addItemInUndo(cart, action) {

    //let undo = [];
    if ( sessionStorage.getItem('undo') === null)  {
        let undo = [];
        cart.action = action;
        undo.push(cart);
        console.log(undo);
        sessionStorage.setItem('undo', JSON.stringify(undo))  

    }
    else{
        let undo = JSON.parse(sessionStorage.getItem('undo'));
        cart.action = action;
        undo.push(cart);
        console.log(undo);
        sessionStorage.setItem('undo', JSON.stringify(undo))  
    }


}



function addItemInRedo(){


}



function removeItemFromUndo(){

    let undoArray = JSON.parse(sessionStorage.getItem('undo'));         // Get undo array items from storage(database)
    let undoItem = undoArray.pop();                                     // Remove the lastest item 
    sessionStorage.setItem('undo', JSON.stringify(undoArray));          // Save the undo array back in storage(database)     

    let action = undoItem.action;                                       // Get the action of the item

    switch(action) {
        case "add": // if the action was add, then remove the item
                console.log(undoItem);
                
                let cart = JSON.parse(sessionStorage.getItem('cart'));  // Get cart items from storage (database)
                cart.items.pop();                                       // Remove the item from cart         
                sessionStorage.setItem('cart', JSON.stringify(cart));   // Save the changes in cart
                drawCart();                                             // Redraw & Update the cart View  


          break;
        case "remove":


          
          break;
        default:
          // code block
      }


}


function removeItemFromRedo(){


}


$(document).ready(function(){


$('#undobtn').click(function(){

    removeItemFromUndo();




})


});