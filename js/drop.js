/**
 * Created by LOe on 01/12/15.
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

    nodeCopy.id = "newId";  // We cannot use the same ID. Ideally we should generate the new ID with a
                            // random or incremental number. This is left as an exercise...
                            //

    nodeCopy.draggable = "false"; // The new element is set as being not draggable.

    ev.target.appendChild(nodeCopy);

    // Get the ID of the target (the order).
    //
    var tempid = "#" + ev.target.id;

    // Get the HTML content of the order.
    //
    order = $(tempid).html();

    // Get the prices from the order.
    //
    prices = getPrices(order);

    // Make a total sum of all the prices.
    //
    sum = sumTotal(prices);
    console.log(sum);
    // Replace the content of the order with the new sum
    //
    //$(orderTable(tempid) + " .tsum").text(sum + " kr.");
   //$("#divPrice").text(sum + " kr.");
    $("#divA").text(sum + " kr.");

}

// Get the list of prices from all the currentorders.
//
function getPrices (htmlString) {

    // We create a new jQuery object and put the HTML string into it.
    //
    var el = $( '<div></div>' );
    el.html(htmlString);

    // Then we can use jQuery to find all elements in this string.
    //
    return $('.price', el); // All the price elements
}

// Sum up all the prices in the order. Note that the data is still stored in an HTML string.
//
function sumTotal(data) {

    // reset the total sum;
    //
    var sum = 0;

    // Go through the elements and collect the internal texts.
    // Each string is parsed to an integer.
    //
    for (i = 0; i < data.length; i++) {
        sum += parseInt(data[i].innerText);
    }
    return sum;
}
// ===================================================================================================================
// END OF FILE
// ===================================================================================================================

