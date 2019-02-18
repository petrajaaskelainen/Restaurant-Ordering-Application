//============================================================================
// Name        : language.js
// Author      : Petra Jaaskelainen
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 17th Febraury, 2019
// Last updated: 
// Description : Implements multiple language support.  
// Requires en.json, ur.json and index.html
//=============================================================================

    $(function() {

	/* Creating a variable for storing the data */
   var menuitems = [];

	/* Retreiving specified menu data from the file db.json and defining where it is displayed in the HTML document*/
   	$.getJSON('db.json', function(data) {
       $.each(data.person, function(i, f) {
          var tblRow = "<tr>" + "<td>" + f.name + "</td>" +
           "<td>" + f.priceinclvat + "</td>" + "<td>" + f.catgegory + "</td>" + "<td>" + f.countryoforiginlandname + "</td>" + "<td>" + f.producer + "</td>" + "<td>" + f.alcoholstrength + "</td>" + "<td>" + f.organic + "</td>" + "</tr>"
           $(tblRow).appendTo("#userdata tbody");
	   });
	});

	});