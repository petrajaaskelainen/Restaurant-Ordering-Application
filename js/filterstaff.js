$(document).ready(function(){
    sortByName('ascending');
})
var oldNameOrder='a'
var oldAlcoholOrder='a'
var oldPriceOrder='a'

function sortBy(id){
    
    allFilters=$(".filterCategory")
    console.log(allFilters)
    for(i=0;i<allFilters.length;i++){
        oldval=allFilters[i].innerText;
        if(oldval.indexOf('⇧') != -1 || oldval.indexOf('⇩') != -1){
            len=oldval.length - oldval.split("").reverse().join("").indexOf(' ') 
            oldval=oldval.slice(0,len)
            console.log(oldval)
            allFilters[i].innerText = oldval;
        }
        
    }
    currentValue=$('#'+id).text()
    //console.log(currentValue)
    if(currentValue.indexOf('⇧') == -1 && currentValue.indexOf('⇩') == -1){
        currentValue= currentValue+" ⇧";
    }
    //console.log(currentValue)
    len=currentValue.length - currentValue.split("").reverse().join("").indexOf(' ') 
    oldText=currentValue.slice(0,len)
    
    if (id.includes('name')) {
    check = oldNameOrder == 'd';
        if(check){
    $('#'+id).html(oldText+'&#8679');
    sortByName('ascending');
    oldNameOrder='a'
        }
        else{
            $('#'+id).html(oldText+'&#8681');
            oldNameOrder='d'
            sortByName('descending');
        }
    }
    else if(id.includes('price')){
         check = oldPriceOrder == 'd';
        if(check){
    $('#'+id).html(oldText+'&#8679');
    sortByName('ascending');
    oldPriceOrder='a'
        }
        else{
            $('#'+id).html(oldText+'&#8681');
            oldPriceOrder='d'
            sortByPrice('descending');
        }   
            }
    else if(id.includes('alcohol')){
         check = oldAlcoholOrder == 'd';
        if(check){
    $('#'+id).html(oldText+'&#8679');
    sortByAlcohol('ascending');
    oldAlcoholOrder='a'
        }
        else{
            $('#'+id).html(oldText+'&#8681');
            oldAlcoholOrder='d'
            sortByAlcohol('descending');
        }   
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
function sortByPrice(parameter){
    var divList = $(".menuItemList");
    //console.log(parameter)
    if(parameter == 'ascending'){
         
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
function sortByAlcohol(parameter){
    var divList = $(".menuItemList");
    //console.log(parameter)
    if(parameter == 'ascending'){
         
        divList.sort(function(a, b){ return $(a).data("cart-listing-alcohol").slice(0,-1)-$(b).data("cart-listing-alcohol").slice(0,-1)                            });
        
    }
        else{
           divList.sort(function(a, b){ return $(b).data("cart-listing-alcohol").slice(0,-1)-$(a).data("cart-listing-alcohol").slice(0,-1)}); 
        }
        
    $("#menulist").html(divList);
}

