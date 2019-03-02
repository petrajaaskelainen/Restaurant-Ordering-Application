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




let undo = [];
let redo = [];


function  addItemInUndo(cart, action) {

    console.log(cart.items.length);
    cart.items[cart.items.length-1].action = action;
    console.log(cart);
    sessionStorage.setItem('undo', JSON.stringify(cart))  


}



function addItemInRedo(){


}



function removeItemFromUndo(){

    let undoArray = JSON.parse(sessionStorage.getItem('undo'));

    let undoItem = undoArray.items.pop();
    let action = undoItem.action;

    switch(action) {
        case "add":
                console.log(undoItem);
                

          break;
        case remove:
          // code block
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