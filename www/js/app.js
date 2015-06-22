$(function() {
    
        
        $("#wrongpass").hide();
        $("#enterPass").hide();
        var password = "entertainment";
        password = localStorage.getItem("password") || "entertainment";
    
    
    $("#lock").on("click", function(){   
           $("#enterPass").toggle();               
    });
    
    $("#subPass").on('click',function(){
        var pass = $("#lockpass").val();
        if(pass == password){
            $("#wrongpass").hide();
            $("#enterPass").hide();
            $("#surveySettings").popup('open');
            $("#lockpass").val('');
        }
        else{
            $("#lockpass").val('');
            $("#wrongpass").show();
        }
    });
    
    
   
    
    //Password Change
     $("#savePass").on('click',function(){
         //alert(password);
       var oldPass = $("#oldPass").val();
        var newPass = $("#newPass").val();
         var repPass = $("#repeatPass").val();
         if(oldPass == password){
             if(newPass == ""){
              alert("Password can't be empty");   
             }
            if(newPass == repPass){
                password = newPass;
                // Store
                localStorage.setItem("password", newPass);
                alert("Password has been changed");
            }
            else{
             alert("New Password does not match");   
            }
         }
         else{
            alert("Wrong Old Password");   
         }
    });
    
    
});