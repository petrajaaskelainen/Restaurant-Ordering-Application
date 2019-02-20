var beverges = allBeverages();
//console.log(beverges.slice(1,20));

console.log(beverges[5].name);

/*Taken from
https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array */
function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i].name));

        // Add it to the list:
        list.appendChild(item);
    }
    // Finally, return the constructed list:
    return list;
}

// ===================================================================================================================
// The function returns all food strings (created as divs) of a certain type (given as argument).
//
function getFoods(type, arr) {

    // The collection variable
    //
    var out = "";

    // Go through the array and collect all the items of the desired type.
    //
    for (var i = 0; i < arr.length; i++) {

        // if the item is of the desired type, then we add the HTML string to the collection variable.
        // Otherwise we skip to the next item.
        //
        //if (arr[i].type == type) {
        out += '<div id="' + "menuitem" + i + '" draggable="true" ondragstart="drag(event)">' + arr[i].name + ' <span class="price">' + arr[i].price + '</span></div>';
        //}
    }
    // Once we are finished we return the resulting HTML string containing all the menu items for the desired menu.
    //
    return out;
}

$(getFoods(beverges[0].category, beverges)).appendTo("#div4");
//document.getElementById('div4').appendChild(makeUL(beverges));
