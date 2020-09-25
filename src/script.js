document.addEventListener("DOMContentLoaded", function(event) {
    var studyTimeMins = 25;
    var studyTimeSecs = 0;

    var breakTimeMins = 5;
    var breakTimeSecs = 0;

    var studyTime = null;
    var breakTime = null;

    var initialStudyMinutes = null;
    var initialStudySeconds = null;

    var initialBreakMinutes = null;
    var initialBreakSeconds = null;

    // Initial timer value setup
    document.getElementById("studyTimerMinutes").value = studyTimeMins;
    document.getElementById("studyTimerSeconds").value = "0" + studyTimeSecs;

    document.getElementById("breakTimerMinutes").value = "0" + breakTimeMins;
    document.getElementById("breakTimerSeconds").value = "0" + breakTimeSecs;

    //User shouldn't be able to cancel a timer if it isn't running yet.
    document.getElementById("startStudyBtn").disabled = false;
    document.getElementById("cancelStudyBtn").disabled = true;

    //Make sure the values displayed on the timer are correct
    document.getElementById("studyTimerMinutes").onchange = function(){correctStudyInputTimes()}
    document.getElementById("studyTimerSeconds").onchange = function(){correctStudyInputTimes()}

    document.getElementById("breakTimerMinutes").onchange = function(){correctBreakInputTimes()}
    document.getElementById("breakTimerSeconds").onchange = function(){correctBreakInputTimes()}

    document.getElementById("startStudyBtn").addEventListener("click", function(){

        //Start a timer when the user clicks on the start button
        //Fetch the initial starting values for the timers
        initialStudyMinutes = document.getElementById("studyTimerMinutes").value;
        initialStudySeconds = document.getElementById("studyTimerSeconds").value;

        initialBreakMinutes = document.getElementById("breakTimerMinutes").value;
        initialBreakSeconds = document.getElementById("breakTimerSeconds").value;

        //Start studying!
        startStudyTimer();
    })

    document.getElementById("cancelStudyBtn").addEventListener("click", function(){
        //Cancel the timer when the user clicks on the cancel button
        cancelStudyTimer();
    })


    // setInterval( checkFocus, 5000 )

    function checkFocus() {

        if ( document.hasFocus() ) {
        } else {
            alert("Get back here");
        }
    }
    document.onbeforeunload = function() {

    }

    function disableTimerValueInput(){
        document.getElementById("studyTimerMinutes").disabled = true;
        document.getElementById("studyTimerSeconds").disabled = true;

        document.getElementById("breakTimerMinutes").disabled = true;
        document.getElementById("breakTimerSeconds").disabled = true;
    }

    function enableTimerValueInput(){
        document.getElementById("startStudyBtn").disabled = false;
        document.getElementById("cancelStudyBtn").disabled = true;
    }

    function enableCancelTimerButton(){
        document.getElementById("startStudyBtn").disabled = true;
        document.getElementById("cancelStudyBtn").disabled = false;

    }

    function enableStudyModeStyling(){
        document.getElementById("container").style.backgroundColor = "#003366";
        document.getElementById("studyTimerMinutes").style.color = "white";
        document.getElementById("studyTimerDivider").style.color = "white";
        document.getElementById("studyTimerSeconds").style.color = "white";

        document.getElementById("startStudyBtn").style.borderColor = "white";
        document.getElementById("startStudyBtn").style.color = "white";

        document.getElementById("cancelStudyBtn").style.borderColor = "white";
        document.getElementById("cancelStudyBtn").style.color = "white";
        document.getElementById("siteLink").style.color = "white";
        document.getElementById("audioLink").style.color = "white";

        document.getElementById("breakTimer").style.opacity = "0";
        document.getElementById("infoStudyTimer").style.opacity = "0";
        document.getElementById("infoBreakTimer").style.opacity = "0";


    }

    function studyStartSound(){
        var audio = new Audio('assets/study.mp3');
        audio.play();
    }

    function startStudyTimer(){
        disableTimerValueInput();
        enableCancelTimerButton();
        enableStudyModeStyling();


        studyTimeMins = initialStudyMinutes;
        studyTimeSecs = initialStudySeconds;

        studyStartSound();

        studyTime = setInterval(function() {

            //handle minute rollover
            if(studyTimeSecs - 1 < 0){
                if(studyTimeMins != 0){
                    studyTimeMins = studyTimeMins - 1;
                }
                studyTimeSecs = 59;
            } else {
                studyTimeSecs = studyTimeSecs - 1;
            }

            //Ensure the values displayed are formatted correctly
            handleFormatting();
            document.getElementById("studyTimerMinutes").value = studyTimeMins;
            document.getElementById("studyTimerSeconds").value = studyTimeSecs;

            if (studyTimeMins == 0 && studyTimeSecs == 0) {
                //Stop the running timer
                clearInterval(studyTime);
                studyTime = null;
                //Add new timer values for the break timer
                breakTimeMins = initialBreakMinutes;
                breakTimeSecs = initialBreakSeconds;
                startbreakTimer();
            }
        }, 1000); //every second
    }

    function enableBreakModeStyling(){

        document.getElementById("container").style.backgroundColor = "white";
        document.getElementById("startStudyBtn").style.borderColor = "#0066cc";
        document.getElementById("startStudyBtn").style.color = "#0066cc";

        document.getElementById("cancelStudyBtn").style.borderColor = "#0066cc";
        document.getElementById("cancelStudyBtn").style.color = "#0066cc";

        document.getElementById("studyTimerMinutes").style.color = "#0066cc";
        document.getElementById("studyTimerDivider").style.color = "#0066cc";
        document.getElementById("studyTimerSeconds").style.color = "#0066cc";

        document.getElementById("siteLink").style.color = "#0066cc";
        document.getElementById("audioLink").style.color = "#0066cc";

    }

    function breakStartSound(){
        var audio = new Audio('assets/break.mp3');
        audio.play();
    }

    function startbreakTimer(){
        breakTimeMins = initialBreakMinutes;
        breakTimeSecs =           initialBreakSeconds;
        breakTime = setInterval(function() {

            //handle minute rollover
            if(breakTimeSecs - 1 < 0){
                if(breakTimeMins != 0){
                    breakTimeMins = breakTimeMins - 1;
                }
                breakTimeSecs = 59;
            } else {
                breakTimeSecs = breakTimeSecs - 1;
            }
            //Ensure the values displayed are formatted correctly
            handleFormatting()
                document.getElementById("studyTimerMinutes").value = breakTimeMins;
            document.getElementById("studyTimerSeconds").value = breakTimeSecs;

            if (breakTimeMins == 0 && breakTimeSecs == 0) {
                //Stop the running timer
                clearInterval(breakTime);
                breakTime = null;
                //Add new timer values for the next study timer
                studyTimeMins = initialStudyMinutes;
                studyTimeSecs = initialStudySeconds;
                document.getElementById("studyTimerMinutes").value = studyTimeMins;
                document.getElementById("studyTimerSeconds").value = studyTimeSecs;

                startStudyTimer();
            }
        }, 1000) //every second
    }

    function enableSetupModeStyling(){
        document.getElementById("container").style.backgroundColor = "#0066cc";
        document.getElementById("studyTimerMinutes").style.color = "white";
        document.getElementById("studyTimerDivider").style.color = "white";
        document.getElementById("studyTimerSeconds").style.color = "white";

        document.getElementById("startStudyBtn").style.borderColor = "white";
        document.getElementById("startStudyBtn").style.color = "white";

        document.getElementById("cancelStudyBtn").style.borderColor = "white";
        document.getElementById("cancelStudyBtn").style.color = "white";
        document.getElementById("siteLink").style.color = "white";
        document.getElementById("audioLink").style.color = "white";

        document.getElementById("breakTimer").style.opacity = "1";
        document.getElementById("infoStudyTimer").style.opacity = "1";
        document.getElementById("infoBreakTimer").style.opacity = "1";

        document.getElementById("studyTimerMinutes").disabled = false;
        document.getElementById("studyTimerSeconds").disabled = false;
        document.getElementById("breakTimerMinutes").disabled = false;
        document.getElementById("breakTimerSeconds").disabled = false;


    }

    function cancelStudyTimer(){
        //Stop any running timers
        clearInterval(studyTime);
        clearInterval(breakTime);
        studyTime = null;
        breakTime = null;

        //Restore initial timer values
        document.getElementById("studyTimerMinutes").value = initialStudyMinutes;
        document.getElementById("studyTimerSeconds").value = initialStudySeconds;
        handleFormatting()

            //Allow user to input timer values again
            enableTimerValueInput();

        //Clear the value stored for the timer, a new value will be added when the next timer start
        studyTimeMins = null;
        studyTimeSecs = null;

        breakStartSound();
    }


    function correctStudyInputTimes(){
        //If input value is less than 10 then prefix a 0
        if( document.getElementById("studyTimerMinutes").value < 10){
            if( document.getElementById("studyTimerMinutes").value[0] != "0"){
                document.getElementById("studyTimerMinutes").value= "0" +  document.getElementById("studyTimerMinutes").value;
            }
        }else if(document.getElementById("studyTimerMinutes").value == 0){
            document.getElementById("studyTimerMinutes").value = "0" +document.getElementById("studyTimerMinutes").value ;
        }

        if( document.getElementById("studyTimerSeconds").value < 10){
            if( document.getElementById("studyTimerSeconds").value[0] != "0"){
                document.getElementById("studyTimerSeconds").value= "0" +  document.getElementById("studyTimerSeconds").value;
            }
        }else if(document.getElementById("studyTimerSeconds").value == 0){
            document.getElementById("studyTimerSeconds").value = "0" +document.getElementById("studyTimerSeconds").value ;
        }

        //If input value is greater than the allowed time then reduce the time to within limits
        if( document.getElementById("studyTimerMinutes").value > 90){
            document.getElementById("studyTimerMinutes").value = 90;
        }
        if( document.getElementById("studyTimerSeconds").value > 59){
            document.getElementById("studyTimerSeconds").value =59;
        }
    }

    function correctBreakInputTimes(){
        //If input value is less than 10 then prefix a 0
        if( document.getElementById("breakTimerMinutes").value < 10){
            if( document.getElementById("breakTimerMinutes").value[0] != "0"){
                document.getElementById("breakTimerMinutes").value= "0" +  document.getElementById("breakTimerMinutes").value;
            }
        }else if(  document.getElementById("breakTimerMinutes").value == 0){
            document.getElementById("breakTimerMinutes").value           = "0" +document.getElementById("breakTimerMinutes").value ;
        }

        if( document.getElementById("breakTimerSeconds").value < 10){
            if( document.getElementById("breakTimerSeconds").value[0] != "0"){
                document.getElementById("breakTimerSeconds").value= "0" +  document.getElementById("breakTimerSeconds").value;
            }
        }else if(document.getElementById("breakTimerSeconds").value == 0){
            document.getElementById("breakTimerSeconds").value = "0" +document.getElementById("breakTimerSeconds").value ;
        }

        //If input value is greater than the allowed time then reduce the time to within limits
        if( document.getElementById("breakTimerMinutes").value > 90){
            document.getElementById("breakTimerMinutes").value = 90;
        }

        if( document.getElementById("breakTimerSeconds").value > 59){
            document.getElementById("breakTimerSeconds").value =59;
        }
    }

    function handleTimerRunningFormatting(){
        //If input value is less than 10 then prefix a 0
        if(studyTimeSecs > 0 && studyTimeSecs < 10){
            if(studyTimeSecs[0] != "0"){
                studyTimeSecs = "0" + studyTimeSecs;
            }
        }        if(studyTimeMins > 0 && studyTimeMins < 10){
            if(studyTimeMins[0] != "0"){
                studyTimeMins = "0" + studyTimeMins;
            }
        }else if(studyTimeMins == 0){
            studyTimeMins= "0" + studyTimeMins;
        }


        if(breakTimeMins > 0 && breakTimeMins < 10){
            if(breakTimeMins[0] != "0"){
                breakTimeMins = "0" + breakTimeMins;
            }
        }else if(breakTimeMins == 0){
            breakTimeMins = "0" + breakTimeMins;
        }

        if(breakTimeSecs > 0 && breakTimeSecs< 10){
            if(breakTimeSecs[0] != "0"){
                breakTimeSecs = "0" + breakTimeSecs;
            }
        }else if(breakTimeSecs == 0){
            breakTimeSecs = "0" + breakTimeSecs;
        }
    }
})
