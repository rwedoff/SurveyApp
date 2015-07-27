$(function () {
    $("#thanksSplash").hide();
    $('#newTitle').hide();
    $('#badTitle').hide();
    
    //Get a list of the old surveys
    var readSurveyData = "",
        readSurveyUrl = "",
        defaultQuestions = "\"If you are a University of Iowa student: what year are you?\",\"How did you originally find out about this event?\",\"If you were not attending this event: what would you most likely be doing?\",\"What kind of events would you like to see in the future?\",\"If you were not attending this event: how likely would be doing something that involved drinking alcohol?\",\"Name an event that you would like to see on campus: (Optional)\",\"Would you like to revieve CAB's biweekly Newsletter? Yes: Enter Email\"",
        defaultHTML = '<div class="table-thing with-label no_wrap widget uib_w_1106 d-margins" data-uib="jquery_mobile/radio_button_group" data-ver="0"> ' +
        '<label class="narrow-control label-top-left">If you are a University of Iowa student, what year are you?</label> ' +

          '<fieldset data-role="controlgroup" class="widget-container wide-control uib-jqm-flex" data-child-name="jqm-radio-group-0"> ' +
            '<form id="year">   ' +
              '<div data-uib="jquery_mobile/radio_button" data-ver="0">' +
                '<label>First Year ' +
                 ' <input type="radio" name="jqm-radio-group-0" value="First Year">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1107" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Sophomore' +
                '  <input type="radio" name="jqm-radio-group-0" value="Sophomore">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1107" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Junior' +
                '  <input type="radio" name="jqm-radio-group-0" value="Junior">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1107" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Senior' +
                '  <input type="radio" name="jqm-radio-group-0" value="Senior">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1107" data-uib="jquery_mobile/radio_button" data-ver="0">' +
            '    <label>Graduate' +
             '     <input type="radio" name="jqm-radio-group-0" value="Graduate">' +
              '  </label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1107" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Non-Strudent' +
                '  <input type="radio" name="jqm-radio-group-0" value="Non-Student">' +
                '</label>' +
              '</div>' +
            '</form>' +
          '</fieldset>' +

        '</div>' +

        '<div class="table-thing with-label no_wrap widget uib_w_1110 d-margins" data-uib="jquery_mobile/radio_button_group" data-ver="0">' +
         ' <form id="How">' +
          '  <label class="narrow-control label-top-left">How did you first find out about this event?</label>' +
           ' <fieldset data-role="controlgroup" class="widget-container wide-control uib-jqm-flex" data-child-name="jqm-radio-group-1">' +
            '  <div class="ui-radio widget uib_w_1111" data-uib="jquery_mobile/radio_button" data-ver="0">' +
             '   <label>Poster' +
              '    <input type="radio" name="jqm-radio-group-1" value="Poster">' +
               ' </label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Hand-Out' +
                '  <input type="radio" name="jqm-radio-group-1" value="Hand-Out">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Friend' +
                '  <input type="radio" name="jqm-radio-group-1" value="Friend">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Facebook / Social Media' +
                '  <input type="radio" name="jqm-radio-group-1" value="Facebook / Value">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>CAB Website' +
                '  <input type="radio" name="jqm-radio-group-1" value="CAB Website">' +
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>Other' +
                '  <input type="radio" name="jqm-radio-group-1" value="Other">'+
                '</label>' +
              '</div>' +
              '<div class="ui-radio widget uib_w_1113" data-uib="jquery_mobile/radio_button" data-ver="0">' +
               ' <label>CAB Member' +
                '  <input type="radio" name="jqm-radio-group-1" value="CAB Member">' +
                '</label>' +
              '</div>' +
            '</fieldset>' +
          '</form>' +
        '</div>' +
        '<div class="table-thing with-label no_wrap widget uib_w_1114 d-margins" data-uib="jquery_mobile/checkbox_group" data-ver="0">' +
         ' <form id="else">' +
          '  <label class="narrow-control label-top-left">If you were not attending this event, what would you be doing?</label>' +
           ' <fieldset data-role="controlgroup" class="widget-container wide-control uib-jqm-flex">' +
            '  <div class="ui-checkbox widget uib_w_1115" data-uib="jquery_mobile/checkbox" data-ver="0">' +
                '<label>Studying' +
                 ' <input type="checkbox" value="Studying">' +
                '</label>' +
              '</div>' +
              '<div class="ui-checkbox widget uib_w_1117" data-uib="jquery_mobile/checkbox" data-ver="0">' +
               ' <label>Drinking' +
                '  <input type="checkbox" value="Drinking">' +
                '</label>' +
              '</div>' +
              '<div class="ui-checkbox widget uib_w_1117" data-uib="jquery_mobile/checkbox" data-ver="0">' +
'                <label>Watching TV' +
 '                 <input type="checkbox" value="Watching TV">' +
  '              </label>' +
   '           </div>' +
    '          <div class="ui-checkbox widget uib_w_1117" data-uib="jquery_mobile/checkbox" data-ver="0">' +
                '<label>Sleeping' +
      '            <input type="checkbox" value="Sleeping"> '+
       '         </label>' +
        '      </div>' +
         '     <div class="ui-checkbox widget uib_w_1117" data-uib="jquery_mobile/checkbox" data-ver="0">' +
          '      <label>Hanging with Friends' +
           '       <input type="checkbox" value="Hanging with Friends">' +
            '    </label>' +
             ' </div>' +
'            </fieldset>' +
 '         </form>' +
  '      </div>' +
   '     <div class="table-thing with-label no_wrap widget uib_w_1118 d-margins" data-uib="jquery_mobile/checkbox_group" data-ver="0">' +
    '      <form id="eventType">' +
     '       <label class="narrow-control label-top-left">What type of events would you like to hear more about in the future?</label>' +
      '      <fieldset data-role="controlgroup" class="widget-container wide-control uib-jqm-flex">' +
       '       <div class="ui-checkbox widget uib_w_1119" data-uib="jquery_mobile/checkbox" data-ver="0">' +
        '        <label>ALL' +
         '         <input type="checkbox" value="ALL">' +
          '      </label>' +
           '   </div>' +
            '  <div class="ui-checkbox widget uib_w_1121" data-uib="jquery_mobile/checkbox" data-ver="0">' +
             '   <label>CAB Road Trips' +
              '    <input type="checkbox" value="CAB Road Trips">' +
               ' </label>' +
'              </div>' +
 '             <div class="ui-checkbox widget uib_w_1121" data-uib="jquery_mobile/checkbox" data-ver="0">' +
  '              <label>CAB Movies' +
   '               <input type="checkbox" value="CAB Movies">' +
    '            </label>' +
     '         </div>' +
      '        <div class="ui-checkbox widget uib_w_1121" data-uib="jquery_mobile/checkbox" data-ver="0">' +
       '         <label>Cultural Events' +
        '          <input type="checkbox" value="Cultural Events">' +
         '       </label>' +
          '    </div>' +
           '   <div class="ui-checkbox widget uib_w_1121" data-uib="jquery_mobile/checkbox" data-ver="0">' +
            '    <label>Performances (Dancers, Jugglers, etc.)' +
             '     <input type="checkbox" value="Performances">' +
              '  </label>' +
'              </div>' +
 '             <div class="ui-checkbox widget uib_w_1121" data-uib="jquery_mobile/checkbox" data-ver="0">' +
  '              <label>Comedians' +
   '               <input type="checkbox" value="Comedians">' +
    '            </label>' +
     '         </div>' +
      '      </fieldset>' +
       '   </form>' +
        '</div>' +
        '<div class="table-thing with-label no_wrap widget uib_w_1122 d-margins" data-uib="jquery_mobile/radio_button_group" data-ver="0">' +

'          <label class="narrow-control label-top-left">How likely is it that you would be drinking if you were not to have attended this event?</label>' +
 '         <fieldset data-role="controlgroup" class="widget-container wide-control uib-jqm-flex" data-child-name="jqm-radio-group-2">' +
  '          <form id="drinking">' +
   '           <div class="ui-radio widget uib_w_1124" data-uib="jquery_mobile/radio_button" data-ver="0">' +
    '            <label>Very Likely' +
     '             <input type="radio" name="jqm-radio-group-2" value="Very Likely">' +
      '          </label>' +
       '       </div>' +
        '      <div class="ui-radio widget uib_w_1124" data-uib="jquery_mobile/radio_button" data-ver="0">' +
         '       <label>Somewhat Likely' +
          '        <input type="radio" name="jqm-radio-group-2" value="Somewhat Likely">' +
           '     </label>' +
            '  </div>' +
             ' <div class="ui-radio widget uib_w_1124" data-uib="jquery_mobile/radio_button" data-ver="0">' +
              '  <label>Not Likely' +
               '   <input type="radio" name="jqm-radio-group-2" value="Not Likely">' +
                '</label>' +
'              </div>' +
 '           </form>' +
  '        </fieldset>' +

'        </div>' +
 '       <div class="table-thing with-label widget uib_w_1126 d-margins" data-uib="jquery_mobile/textarea" data-ver="0" id="askEvent">' +
  '        <form id="askEvent">' +
   '         <label class="narrow-control label-top-left">Name an event that you would like to see on campus: (Optional)</label>' +
    '        <input class="wide-control" placeholder="Laser Tag, Trip to Chicago, Movies, etc." rows="2" wrap="soft" type="text" id="event">' +
     '     </form>' +
      '    <form id="askEmail">' +
       '     <label class="narrow-control label-top-left">Would you like to revieve CAB\'s biweekly Newsletter? Yes, Enter Email:</label>' +
        '    <input class="wide-control" placeholder="first-last@uiowa.edu" rows="2" wrap="soft" type="text" id="email">' +
         ' </form>' +
          '  </div>';
        
            
    
    //Contructor for Survey Obj
    function Survey(title, questions, numRes, response, htmlQuestions) {
        this.title = title;
        this.questions = questions;
        this.numRes = numRes;
        this.response = response;
        this.htmlQuestions = htmlQuestions;
    }
    
    
    //Populate old survey list 
    //window.localStorage.clear;
    for(var i in localStorage) {
        var survey = JSON.parse(localStorage[i]);
        if(survey.title !== undefined) {
        $("#oldSurveyList").prepend("<li id='"+survey.title+"'><a href='#newSurvey' id='hrefOnly'>" + survey.title + "</a><span class='ui-li-count'>" + survey.numRes + "</span></li>");
        $('#oldSurveyList').listview("refresh");
        }
    }
   
    
    //Click on li in old survey list, goes to new Survey Page on Href=#newSurvvey
    $('li').on('click', function () {
        $thisTitle = $(this).attr('id');
        $(".surveyTitle").text($thisTitle);
        var survey = JSON.parse(window.localStorage.getItem($thisTitle));
        $('#runningQuestions').append(survey.htmlQuestions);
    });
    
    
    
   //Creates a new survey 
    $("#newSurveyBut").on('click', function () {
        $('#newTitle').show();
        $('#strtBut').hide();
        $('#runningQuestions').append(defaultHTML);
        
         //Creates a date in case new title is NULL
        var d = new Date(),
            datetime = "CAB Survey " + (d.getMonth() + 1)  + " " + d.getFullYear() + " " + d.getHours() + " " + d.getMinutes() + " " + d.getSeconds(),
            $surveyTitle = $("#title").text(),
            surv = new Survey($surveyTitle, defaultQuestions, 0, '', defaultHTML), //Creates survey object
            titleList = [];
        $(".surveyTitle").text(datetime);
       for(var i in localStorage) {
            var survey = JSON.parse(localStorage[i]);
            if(survey.title !== undefined) {
                titleList.push(survey.title);
            }
        }
        //Save the new Title
        $('#saveTitle').on('click', function () {
            $surveyTitle  = $('#titleIN').val() || datetime;
            if (titleList.indexOf($surveyTitle) > -1) {
                $("#badTitle").show();
            } else {
                $('#strtBut').show();
                //Sets the title in the UI
                $('#newTitle').hide();
                $('#titleIN').val('');
                //Creates new survey
                surv.title = $surveyTitle;
                $(".surveyTitle").text(surv.title);
                //Save survey meta in local storage
                window.localStorage.setItem(surv.title, JSON.stringify(surv));
                //Update the survey list UI in OLD SURVEY PAGE
                $("#oldSurveyList").append("<li id='" + surv.title + "'><a href='#newSurvey' id='hrefOnly'>" + surv.title + "</a><span class='ui-li-count'>" + surv.numRes + "</span></li>");
                $('#oldSurveyList').listview("refresh");
            }
        });
    });
    
 
    //Survey Splash Screen
    function survSplash() {
        $("#startScreen").slideUp(500).delay(5500).slideDown(300);
        $("#thanksSplash").slideDown(500).delay(5500).slideUp(300);
    }
    
//Resets the Survey    
    function resetForms() {
        document.getElementById("year").reset();
        document.getElementById("How").reset();
        document.getElementById("else").reset();
        document.getElementById("eventType").reset();
        document.getElementById("drinking").reset();
        $('#event').val('');
        $('#email').val('');                
    }
    
    function processSurvey() {
        var $year = $('input[type=radio]:checked', '#year').val() || " ",
            $how = $('input[type=radio]:checked', '#How').val() || " ",
            $else = $('input[type=radio]:checked', '#else').val() || " ",
            $askEvent = $("input[type=text]", "#askEvent").val() || " ",
            $askEmail = $("#email").val() || " ",
            eventValues = $('input[type="checkbox"]:checked', '#eventType').map(function () {
                return this.value;
            }).get() || " ",
            elseValues = $('input[type="checkbox"]:checked', '#else').map(function () {
                return this.value;
            }).get() || " ",
            $drinking = $('input[type=radio]:checked', '#drinking').val() || " ",
            csvData = [];
    
        function myToString(arr) {
            var res = "";
                
            for (var i=0; i<arr.length; i++){
                res += arr[i] + " ";
            }
            return res;
        }
        
        $askEvent = $askEvent.replace(',', ' ');
        $askEmail = $askEmail.replace(',', ' ');
        
        csvData[0] = "\"" + $year + "\"";
        csvData[1] = "\"" + $how + "\"";
        csvData[2] = "\"" + myToString(elseValues) + "\"";
        csvData[3] = "\"" + myToString(eventValues) + "\"";
        csvData[4] = "\"" + $drinking + "\"";
        csvData[5] = "\"" + $askEvent + "\"";
        csvData[6] = "\"" + $askEmail + "\"";
        csvData.join(',');
        return csvData.toString();
    }
    

    
   //Submit Survey, calls Cordova Read and Write
    
    $(".submitSurv").on("click", function () {
    
        var thisSurveyTitle = $("#title").text(),
            thisSurvey =  JSON.parse(window.localStorage.getItem(thisSurveyTitle)),
            thisSurveyQuestions = thisSurvey.questions,
            numRes = thisSurvey.numRes,
            surveyResponse = thisSurvey.response;
        
        var processedData = processSurvey();
        if (processedData !== '" "," ","",""," "," "," "') { //Do not allow empty survey
            window.console.log(readSurveyData.indexOf(thisSurveyQuestions));
            if (surveyResponse.indexOf(thisSurveyQuestions) !== -1) {
                surveyResponse += "\n" + processedData;
            } else {
                surveyResponse += thisSurveyQuestions + "\n" + processedData;
            }
            
        }
        
        writeFile(thisSurvey.title, surveyResponse);
        thisSurvey.response = surveyResponse;
        console.log(thisSurvey.response);
        survSplash();
        thisSurvey.numRes += (1);
        window.localStorage.setItem(thisSurvey.title, JSON.stringify(thisSurvey));
        $('#oldSurveyList').listview("refresh");
        resetForms();
        activate_subpage("#page_79_6");
     
    });
    //Delete survey, still on file system, but not in app.
    $('#delBut').on('click', function () {
        var yesDelete = window.confirm("Are you sure you want to delete this survey? (The CSV file will still be in the file system)");
        if (yesDelete === true) {
            var thisSurveyTitle = $("#title").text();
            window.localStorage.removeItem(thisSurveyTitle);
            var jqTitle = "#" + thisSurveyTitle;
            $(jqTitle).remove();
            $('#oldSurveyList').listview("refresh");
        }
    });

    //UI Stuff / Password handling   
    $("#wrongpass").hide();
    $("#enterPass").hide();
    var password = "entertainment";
    password = localStorage.getItem("password") || "entertainment";
    
    
    $("#lock").on("click", function () {
        $("#enterPass").toggle();
    });
    
    $("#subPass").on('click', function () {
        var pass = $("#lockpass").val();
        if (pass === password) {
            $("#wrongpass").hide();
            $("#enterPass").hide();
            $("#surveySettings2").popup('open');
            $("#lockpass").val('');
        } else {
            $("#lockpass").val('');
            $("#wrongpass").show();
        }
    });
    
    //Password Change
    $("#savePass").on('click', function () {
         //alert(password);
        var oldPass = $("#oldPass").val(),
            newPass = $("#newPass").val(),
            repPass = $("#repeatPass").val();
        if (oldPass === password) {
            if (newPass === "") {
                window.alert("Password can't be empty");
            }
            if (newPass === repPass) {
                password = newPass;
                // Store password
                localStorage.setItem("password", newPass);
                window.alert("Password has been changed");
            } else {
                window.alert("New Password does not match");
            }
        } else {
            window.alert("Wrong Old Password");
        }
    });
    
    function writeFile(title, data) {
 // Wait for device API libraries to load
    //
        document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function gotFS(fileSystem) {
            fileSystem.root.getFile(title + ".csv", {create: true, exclusive: false}, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        }

        function gotFileWriter(writer) {
            writer.onwriteend = function(evt) {
                window.console.log("contents of file now " + data);
                writer.truncate(0);
                writer.onwriteend = function (evt) {
              //      console.log("contents of file now " + data);
              //     writer.seek(4);
                    writer.write(data);
                    writer.onwriteend = function (evt) {
                //    console.log("contents of file now " + data);
                    };
                };
            };
            writer.write(data);
        }

        function fail(error) {
            window.console.log("Writer Error: " + error.code);
        }
        
    } 
    
});