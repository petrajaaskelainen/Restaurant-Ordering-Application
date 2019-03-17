//============================================================================
// Name        : language.js
// Author      : Hafiz Areeb Asad
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 17th Febraury, 2019
// Last updated: 
// Description : Implements multiple language support.
//               I personally acknowledge the contributions of Mr. Attique ur Rehman (Pakistani National)
//               assisting in translation of english language to urdu language.
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
        $('#checkout-process-steps').text(language.checkoutProcessSteps);
       //----------------Tab Buttons-----------------//
        $('#homeTab').html(language.homeTab);
        $('#orderTab').html(language.orderTab);
        $('#historyTab').html(language.historyTab);
        $('#inventoryTab').html(language.inventoryTab);

        $('#companyName').text(language.companyName);
        $('#companyParagraph').text(language.companyParagraph);	
        
        $('#checkOutStepsHeading').text(language.checkOutStepsHeading);
        $('#checkOutStepsOneText').text(language.checkOutStepsOneText);	
        $('#checkOutStepsTwoText').text(language.checkOutStepsTwoText);	
        $('#checkOutStepsThreeText').text(language.checkOutStepsThreeText);	

        $('#nameCategory').html(language.nameCategory);
        $('#alcoholCategory').html(language.alcoholCategory);
        $('#originCategory').html(language.originCategory);
        $('#inStockCategory').html(language.inStockCategory);
        $('#priceCategory').html(language.priceCategory);


        $('#backbtn').html(language.backbtn);
        $('#confirmbtn').html(language.confirmbtn);
        $('#backtomenu').html(language.backtomenu);

        $('#undoBtn').html(language.undoBtn);
        $('#emptyCartBtn').html(language.emptyCartBtn);
        $('#redoBtn').html(language.redoBtn);
        $('#checkoutbtn').html(language.checkoutbtn);

        $('#dragItemsText').html(language.dragItemsText);

        



		
		
		
		
		
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
