(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Button */
    
    
        /* button  Button */
    
    
        /* button  Button */
    $(document).on("click", ".uib_w_1091", function(evt)
    {
         activate_subpage("#settingspage"); 
    });
    
    
        /* button  #settingsBut */
    $(document).on("click", "#settingsBut", function(evt)
    {
         activate_subpage("#page_71_63"); 
    });
    
        /* button  #oldSurveyBut */
    $(document).on("click", "#oldSurveyBut", function(evt)
    {
         activate_subpage("#oldSurveyPage"); 
    });
    
    
        /* button  #startSurv */
    $(document).on("click", "#startSurv", function(evt)
    {
         activate_subpage("#runSurvey"); 
    });
    
        
    
    
        /* a  #settingsHome */
    $(document).on("click", "#settingsHome", function(evt)
    {
         activate_subpage("#oldSurveyPage"); 
    });
    
        /* button  #homeBut */
    $(document).on("click", "#homeBut", function(evt)
    {
         activate_subpage("#homePage"); 
    });
    
        /* button  #cancel */
    $(document).on("click", "#cancel", function(evt)
    {
         activate_subpage("#homePage"); 
    });
    
        
        /* button  #rSurveyBack */
    $(document).on("click", "#rSurveyBack", function(evt)
    {
         activate_subpage("#page_79_6"); 
    });
    
        /* button  #togglemenu */
    $(document).on("click", "#togglemenu", function(evt)
    {
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($(".uib_w_1133"));  
    });
     
     $('.sideEL').click(function () {
                uib_sb.close_all_sidebars();
     });
     
     
     $(document).click(function(event) { 
         event.stopPropagation();
    if(!$(event.target).closest('.uib_w_1133').length) {
        if($('.uib_w_1133').is(":visible")) {
            event.stopPropagation();
             uib_sb.close_all_sidebars();
            
        }
    }        
})
    
    $(document).keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
    }
});
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
