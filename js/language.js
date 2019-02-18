//============================================================================
// Name        : language.js
// Author      : Hafiz Areeb Asad
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 17th Febraury, 2019
// Last updated: 
// Description : Implements multiple language support.  
// Requires en.json, ur.json and index.html
//=============================================================================


$(document).ready(function(){
    var language;               // Variable to store language text

    /* Saves selected language in localStorage*/
    /* Please note there is second parameter callback,
       1. Sometimes we pass an optional function as a parameter
       2. This optional function executes when all other instructions of this function executes
       3. It's not necessary to always call setLanguage function with a callback parameter  */
    function setLanguage(lang, callback) {
        localStorage.setItem('language', lang);
        callback();
    }

    /* This function updates all the text in the webpage as per the desired language */
    function updateLanguage(){
        $('#div1').text(language.welcome);
        $('#div2').text(language.order);
    }
    
    /* This function gets content from the slected language file, if no language is selected then by
       as a default language sets engilsh language and calls updateLanguage function to update
       the content of webpage */
    function initializeAndGetLanguage() {
        (localStorage.getItem('language') == null) ? setLanguage('en') : false;
        
        /*On html page shows the localStorage/Session value 
         Note: This is needed because when we change the language from langA to langB and
         close the webpage and then agin reopen the webpage, it shows the langA in drop down
         menu as selected and langB content on the webpage */
        $('#languageOptionSelector').val(localStorage.getItem('language')).prop('selected', true);
        
        $.getJSON( './languages/' + localStorage.getItem('language') + '.json' , function(result) {
           language = result;
           updateLanguage();
        });
        
    }   

    /* Gets the User option for language, sets that language and calls
     initializeAndGet function   */
    $('#languageOptionSelector').change(function(){
        var $option = $(this).find('option:selected');
        var lang = $option.val();          //to get content of "value" attribute
        
        setLanguage(lang,function(){initializeAndGetLanguage()});     // Here we have used callback function
    }); 
        

    initializeAndGetLanguage();
    
});
