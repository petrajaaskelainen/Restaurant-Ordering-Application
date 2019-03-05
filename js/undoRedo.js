//============================================================================
// Name        : undoRedo.js
// Author      : Hafiz Areeb Asad,...
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 02 March, 2019
// Last updated: 
// Description : Implements undo/redo functionality  
// Requires drop.js and  index.html files
//=============================================================================

let UNDO;
let REDO;

if ( document.URL.includes("indexStaff.html") ) {
    UNDO = "undo-staff";
    REDO = "redo-staff";
}
else {
    
    if ( document.URL.includes("indexCustomer.html") ){
        UNDO = "undo-customer";
        REDO = "redo-customer";
    }
}

/**
 * 
 * @param {*ID of the item. (ID can be of menuitem OR cartItem)} recID 
 * @param {*Action performed e.g. "add", "remove", "plus", "minus" } recAction
 * @description This function adds item's id and it's action in undo Stack (Array)
 *              and is used by 4 functions of cart and 2 function of redo functionality. 
 */
function  addItemInUndo(data, recAction, clearRedo = false) {

    console.log("Data In Undo");
    console.log (data);
    let undoObject = {
        id: data.id,
        quantity: data.quantity,
        action: recAction
    }

    if ( (clearRedo === true) && (sessionStorage.getItem('redo') !== null) ){
        let redoArray = sessionStorage.getItem('redo');
            redoArray= [];
            sessionStorage.setItem('redo', JSON.stringify(redoArray));  
    }
    
    if ( sessionStorage.getItem('undo') === null)  {
        
        let undo = [];
        undo.push(undoObject);
        console.log("First time, Add item in undo: ");
        console.log(undo);
        sessionStorage.setItem('undo', JSON.stringify(undo));  

    }
    else{
        let undo = JSON.parse(sessionStorage.getItem('undo'));
        undo.push(undoObject);
        console.log("After First time, Add item in undo: ");
        console.log(undo);
        sessionStorage.setItem('undo', JSON.stringify(undo));  
    }

    $('#undoBtn').prop('disabled', false);


}



function addItemInRedo(data, recAction){


    let redoObject = {
        id: data.id,
        quantity: data.quantity,
        action: recAction
    }
    
    if ( sessionStorage.getItem('redo') === null)  {
        
        let redo = [];
        redo.push(redoObject);
        console.log("First time, Add item in Redo: ");
        console.log(redo);
        sessionStorage.setItem('redo', JSON.stringify(redo))  

    }
    else{

        let redo = JSON.parse(sessionStorage.getItem('redo'));
        redo.push(redoObject);
        console.log("After First time, Add item in Redo: ");
        console.log(redo);
        sessionStorage.setItem('redo', JSON.stringify(redo))  

    }

    $('#redoBtn').prop('disabled', false);


}



function removeItemFromUndo(){

    let undoArray = JSON.parse(sessionStorage.getItem('undo'));         // Get undo array items from storage(database)
    let undoItem = undoArray.pop();                                     // Remove the lastest item 
    sessionStorage.setItem('undo', JSON.stringify(undoArray));          // Save the undo array back in storage(database)     
    let cart;

    let action = undoItem.action;                                       // Get the action of the item
    let id = undoItem.id;                                               // Get the id of the item
    let quantity = undoItem.quantity;
    let tempMenuID;
    let tempCartID;

    let data = {id: id, quantity: quantity};

    switch(action) {
        case "add": // if the action was add, then remove the item
                tempMenuID = removeItemFromCart(id, false);
                drawCartView();                                         // Redraw & Update the cart View  
                addItemInRedo(tempMenuID, "remove");
          break;

        case "remove":
                tempCartID = addOrPlusItemInCart(data, false);            // Adds the item back in cart         
                drawCartView();                                         // Redraw & Update the cart View      
                addItemInRedo(tempCartID , "add");            
            break;

        case "Plus":
                minusQuantityOfItemInCart(id, false)                    // Decreament the item quantity in cart         
                drawCartView();                                         // Redraw & Update the cart View 
                addItemInRedo(data, "Minus");           
          break;

        case "Minus":
                plusQuantityOfItemInCart(id, false)                     // Increament the item quantity in cart         
                drawCartView();                                         // Redraw & Update the cart View  
                addItemInRedo(data, "Plus");           
          break;


        default:
          // code block
      }

    if (undoArray.length === 0 )
    {
        $('#undoBtn').prop('disabled', true);

    }  


}


function removeItemFromRedo(){
    
    let redoArray = JSON.parse(sessionStorage.getItem('redo'));         // Get redo array items from storage(database)
    let redoItem = redoArray.pop();                                     // Remove the lastest item 
    sessionStorage.setItem('redo', JSON.stringify(redoArray));          // Save the undo array back in storage(database)     
    let cart;

    let action = redoItem.action;                                       // Get the action of the item
    let id = redoItem.id;                                               // Get the id of the item
    let quantity = redoItem.quantity;

    let tempMenuID;
    let tempCartID;

    let data = {id: id, quantity: quantity};

    switch(action) {
        case "add": // if the action was add, then remove the item
                tempMenuID = removeItemFromCart(id, false);
                drawCartView();                                         // Redraw & Update the cart View  
                addItemInUndo(tempMenuID, "remove");                    // Redraw & Update the cart View  
          break;

        case "remove":
                tempCartID = addOrPlusItemInCart(data, false);            // Adds the item back in cart         
                drawCartView();                                         // Redraw & Update the cart View
                addItemInUndo(tempCartID, "add");            
          break;

        case "Plus":
                minusQuantityOfItemInCart(id, false)                    // Decreament the item quantity in cart         
                drawCartView();                                         // Redraw & Update the cart View   
                addItemInUndo(data, "Minus");           
          break;

        case "Minus":
                plusQuantityOfItemInCart(id, false)                     // Increament the item quantity in cart         
                drawCartView();                                         // Redraw & Update the cart View     
                addItemInUndo(data, "Plus");          
          break;


        default:
          // code block
      }

      if (redoArray.length === 0 )
      {
          $('#redoBtn').prop('disabled', true);
  
      }  

}


$(document).ready(function(){


    $('#undoBtn').prop('disabled', true);
    $('#redoBtn').prop('disabled', true);


    $('#undoBtn').click(function(){

        removeItemFromUndo();
    })

    $('#redoBtn').click(function(){

        removeItemFromRedo();
    })



});