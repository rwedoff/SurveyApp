$(function () {
    
    $("#thanksSplash").hide();
    $('#newTitle').hide();
    $('#badTitle').hide();
    
    //Get a list of the old surveys
    var readSurveyData = "",
        defaultQuestions = "\"If you are a University of Iowa student: what year are you?\",\"How did you originally find out about this event?\",\"If you were not attending this event: what would you most likely be doing?\",\"What kind of events would you like to see in the future?\",\"If you were not attending this event: how likely would be doing something that involved drinking alcohol?\",\"Name an event that you would like to see on campus: (Optional)\",\"Would you like to revieve CAB's biweekly Newsletter? Yes: Enter Email\"",
        surveyList = JSON.parse(localStorage.getItem("surveyList")) || [];
            
    
      
   
 
    
    //Contructor for Survey Obj
    function Survey(title, questions) {
        this.title = title;
        this.questions = questions;
    }
    
    
    //Populate old survey list 
    for (var i = 0; i<surveyList.length; i++) {
                $("#oldSurveyList").prepend("<li><a href='#newSurvey'>" + surveyList[i].title + "</a></li>");                
        $('#oldSurveyList').listview("refresh");
    }
   
    
    //Click on li in old survey list, goes to new Survey Page on Href=#newSurvvey
    $('li').on('click', function () {
        $(".surveyTitle").text($(this).text());
    });
    
    
    
   //Creates a new survey 
    $("#newSurveyBut").on('click', function () {
        $('#newTitle').show();
        $('#strtBut').hide();
         
        //Creates a date in case new title is NULL
        var d = new Date(),
            datetime = "CAB Survey " + (d.getMonth() + 1)  + " " + d.getFullYear() + " " + d.getHours() + " " + d.getMinutes() + " " + d.getSeconds();
        
        $(".surveyTitle").text(datetime);
        var $surveyTitle = $("#title").text(),
            surv = new Survey($surveyTitle, defaultQuestions); //Creates survey object
        //Save the new Title
        $('#saveTitle').on('click', function () {
            $surveyTitle  = $('#titleIN').val() || datetime;
            
            $('#strtBut').show();
            //Sets the title in the UI
            $('#newTitle').hide();
            $('#titleIN').val('');
            //Creates new survey
            surv.title = $surveyTitle;
            $(".surveyTitle").text(surv.title);
            
        //Add survey to the list of surveys
            surveyList.push(surv);
        //Update the survey list in local storage
            window.localStorage.setItem("surveyList", JSON.stringify(surveyList));
        
        //Update the survey list UI in OLD SURVEY PAGE
            $("#oldSurveyList").append("<li><a href='#newSurvey'>" + surv.title + "</a></li>");
            $('#oldSurveyList').listview("refresh");
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
        var $askEvent = $("input[type=text]", "#askEvent").val() || " ",
            $askEmail = $("input[type=email]", "#askEmail").val() || " ";
        $askEvent = $askEvent.replace(',',' ');
        $askEmail = $askEmail.replace(',',' ');
    
    
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
    
   
    function readFile(title) {
      // Wait for device API libraries to load
        var result = "";
        document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function gotFS(fileSystem) {
            fileSystem.root.getFile(title + ".csv", null, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }

        function gotFile(file){
            readDataUrl(file);
            readAsText(file);
        
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
            console.log("Read as data URL");
            //console.log(evt.target.result);
            };
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
            console.log("Read as text");
           // console.log("This is what was read: " +  evt.target.result);
            readSurveyData = evt.target.result;
            
            };
            reader.readAsText(file);
    
        }

        function fail(evt) {
            console.log("Reader Error: " + evt.target.error.code);
        }
        
       return result;
    }
    
    
    
    function writeFile(title, data){
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
            console.log("contents of file now " + data);
            //writer.truncate(11);
                writer.onwriteend = function(evt) {
                    console.log("contents of file now " + data);
                    writer.seek(4);
                    writer.write(data);
                    writer.onwriteend = function(evt){
                    console.log("contents of file now " + data);
                    };
                };
            };
            writer.write(data);
        }

        function fail(error) {
            console.log("Writer Error: " + error.code);
        }
        
    }
    
    
    //Submit Survey, calls Cordova Read and Write
    
    
    $(".submitSurv").on("click", function () {
    
        var title = $("#title").text();
        debugger;
        for( var i = 0; i < surveyList.length; i++) {
        
            if( surveyList[i].title === title  ) {
                    alert(surveyList[i].questions);
                readSurveyData = surveyList[i].questions;
            }
        }
          
       readFile(title);
       
        
        var processedData = processSurvey();
        if (processedData !== '" "," ","",""," "," "," "') { //Do not allow empty survey
            readSurveyData += "\n" + processedData;
        }
    
        writeFile(title, readSurveyData);
        survSplash();
        resetForms();
        activate_subpage("#page_79_6");
     
    });
    
   
        
});