// Name        : filter.js
// Author      : Ridhi Agrawal
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 13th march, 2019
// Description : filter for the menu item list,price and alcohol percentage.   



$(document).ready(function(){


    $('#alcoholStrengthSelector').change(function (){
        changeAlcohol();
    })
    $('#priceSelector').change(function(){
        changePrice();
    })
        $('#nameSelector').change(function(){
        changeName();
    })
     
});
 


function changeName(){    

    var currentValue=document.getElementById('nameSelector').value;
    
    if(currentValue == 'Default'){
            
    }
    else if(currentValue == 'ascending'){ 
        console.log('in changeName');
        sortByName('ascending');
    }
    else{
        console.log('in changeName');
        sortByName('descending');
    }
        
}


function sortByName(parameter){

    var divList = $(".menuItemList");
    
    if(parameter == 'ascending'){
        
        divList.sort(function(a, b){ 
            return ('' +  $(a).data("cart-listing-name")).localeCompare( $(b).data("cart-listing-name"));
        });
    }
    else{
        divList.sort(function(a, b){ 
            return ('' +  $(b).data("cart-listing-name")).localeCompare( $(a).data("cart-listing-name"));
        }); 
    }
        
    $("#menulist").html(divList);
}
        
function changeAlcohol(){    
       var currentValue=document.getElementById('alcoholStrengthSelector').value;
       if(currentValue == '1'){
            
        }
        else if(currentValue == '2'){ 
            //console.log('in changeAlcohol');
            sortByAlcohol(2);
        }
        else{
            //console.log('in changeAlcohol');
            sortByAlcohol(3);
        }
        
}

function sortByAlcohol(parameter){
    var divList = $(".menuItemList");
    //console.log(parameter)
    if(parameter == 2){
         
        divList.sort(function(a, b){ return $(a).data("cart-listing-alcohol").slice(0,-1)-$(b).data("cart-listing-alcohol").slice(0,-1)                            });
        
    }
        else{
           divList.sort(function(a, b){ return $(b).data("cart-listing-alcohol").slice(0,-1)-$(a).data("cart-listing-alcohol").slice(0,-1)}); 
        }
        
    $("#menulist").html(divList);
}
        

function changePrice(){    
       var currentValue=document.getElementById('priceSelector').value;
       if(currentValue == '1'){
            
        }
        else if(currentValue == '2'){ 
            //console.log('in changePrice');
            sortByPrice(2);
        }
        else{
            //console.log('in changePrice');
            sortByPrice(3);
        }
        
}

function sortByPrice(parameter){
    var divList = $(".menuItemList");
    //console.log(parameter)
    if(parameter == 2){
         
        divList.sort(function(a, b){ 
            return (''+$(a).data("cart-listing-price"))-($(b).data("cart-listing-price"));                        
                                   });
        
    }
        else{
           divList.sort(function(a, b){ return(''+ $(b).data("cart-listing-price"))-($(a).data("cart-listing-price"))
                                      }); 
        }
        
    $("#menulist").html(divList);
}
