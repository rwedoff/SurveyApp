$(function () {
    $("#thanksSplash").hide();
    $('#newTitle').hide();
    $('#badTitle').hide();
    
    //Get a list of the old surveys
    var readSurveyData = "",
        readSurveyUrl = "",
        defaultQuestions = "\"If you are a University of Iowa student: what year are you?\",\"How did you originally find out about this event?\",\"If you were not attending this event: what would you most likely be doing?\",\"What kind of events would you like to see in the future?\",\"If you were not attending this event: how likely would be doing something that involved drinking alcohol?\",\"Name an event that you would like to see on campus: (Optional)\",\"Would you like to revieve CAB's biweekly Newsletter? Yes: Enter Email\"";
        
            
    
    //Contructor for Survey Obj
    function Survey(title, questions, numRes, response) {
        this.title = title;
        this.questions = questions;
        this.numRes = numRes;
        this.response = response;
    }
    
    
    //Populate old survey list 
    //window.localStorage.clear;
    for(var i in localStorage) {
        var survey = JSON.parse(localStorage[i]);
        if(survey.title !== undefined) {
        $("#oldSurveyList").prepend("<li id='"+survey.title+"'><a href='#newSurvey' id='hrefOnly'>" + survey.title + "<div class='ui-li-count'>" + survey.numRes + "</div></a></li>");
        $('#oldSurveyList').listview("refresh");
        }
    }
   
    
    //Click on li in old survey list, goes to new Survey Page on Href=#newSurvvey
    $('li').on('click', function () {
        $(".surveyTitle").text($(this).attr('id'));
    });
    
    
    
   //Creates a new survey 
    $("#newSurveyBut").on('click', function () {
        $('#newTitle').show();
        $('#strtBut').hide();
        
         //Creates a date in case new title is NULL
        var d = new Date(),
            datetime = "CAB Survey " + (d.getMonth() + 1)  + " " + d.getFullYear() + " " + d.getHours() + " " + d.getMinutes() + " " + d.getSeconds(),
            $surveyTitle = $("#title").text(),
            surv = new Survey($surveyTitle, defaultQuestions, 0, ''), //Creates survey object
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
                $("#oldSurveyList").append("<li id='" + surv.title + "'><a href='#newSurvey' id='hrefOnly'>" + surv.title + "<div class='ui-li-count'>" + surv.numRes + "</div></a></li>");
                $('#oldSurveyList').listview("refresh");
            }
        });
    });
    
    
    
//    //UPDATE THIS FUNCTION LATER!
//    $("#changeTitle").on('click',function(){
//        var index = surveyList.indexOf(surveyTitle);
//        //surveyList.remove(index);
//        var surveyTitle = prompt("Enter a New Title: ");
//        $(".surveyTitle").text(surveyTitle);
//        surveyList.push(surveyTitle);
//        localStorage.setItem(surveyList);
//        
//         $("#oldSurveyList").prepend("<li>" + surv.title + ': ' + surv.numSurveys +"</li>");
//    });
//    
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
            $askEmail = $("input[type=email]", "#askEmail").val() || " ",
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

       
   /* function readFile(title) {
         // Wait for device API libraries to load
        
        document.addEventListener("deviceready", onDeviceReady, false);
        function fail(evt) {
            window.console.log("Reader Error: " + evt.target.error.code);
        }
        function gotFS(fileSystem) {
            fileSystem.root.getFile(title + ".csv", null, gotFileEntry, fail);
        }
        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }
    // device APIs are available
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                window.console.log("Read as data URL");
                window.console.log(evt.target.result);
                readSurveyUrl = evt.target.result;
            };
            reader.readAsDataURL(file);
        }

        
        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                window.console.log("Read as text");
             console.log("This is what was read!!!!!!!!!!!!!: " +  evt.target.result);
                readSurveyData = evt.target.result;
            
            };
            reader.readAsText(file);
        }


        function gotFile(file) {
            readDataUrl(file);
            readAsText(file);
        
        }
            
    }
    */
    
    
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