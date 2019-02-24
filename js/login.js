//============================================================================
// Name        : login.js
// Author      : Hafiz Areeb Asad
// Version     : 1.0
// Copyright   : (c) Reserved
// Date Created: 24th Febraury, 2019
// Last updated: 
// Description : Implements login functionality.  
// Requires 
//=============================================================================


$(document).ready(function(){
   
    
    console.log(userDetails("jorass")); 
    
    $('#loginbtn').click(function(){

        var userName = $('#loginUsername').val();              
        var userPass = $('#loginPassword').val()

        var userDet =  userDetails(userName);   // jorass 
        var hash = md5(userPass);               // "2063c1608d6e0baf80249c42e2be5804"


        if (userName === '' || userPass === ''){
        
                if(userName === userDet.userName && hash === userDet.pass){

                    console.log("correct");



                }
                 else{
                        $('#loginmsg').text("Username OR Password Incorrect!");
                 }
        }
        else{
                //if empty then show
                $('#loginmsg').text("Username OR Password not entered!");

        }




    })  


    
    




});
