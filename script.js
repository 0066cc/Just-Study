document.addEventListener("DOMContentLoaded", function(event) {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(function() {
                console.log('Service Worker Registered');
            });
    }
    var defaultStudyTimeMins = 25;
    var defaultStudyTimeSecs = 0;

    var studyCounter = 0;

    var defaultBreakTimeMins = 5;
    var defaultBreakTimeSecs = 0;


    var studyTimeMins = defaultStudyTimeMins;
    var studyTimeSecs = defaultStudyTimeSecs;

    var breakTimeMins = defaultBreakTimeMins;
    var breakTimeSecs = defaultBreakTimeSecs;

    var studyTime = null;
    var breakTime = null;

    var initialStudyMinutes = null;
    var initialStudySeconds = null;

    var initialBreakMinutes = null;
    var initialBreakSeconds = null;

    // Initial timer value setup
    document.getElementById("studyTimerMinutes").value = studyTimeMins;
    document.getElementById("studyTimerSeconds").value = studyTimeSecs;

    document.getElementById("breakTimerMinutes").value = breakTimeMins;
    document.getElementById("breakTimerSeconds").value = breakTimeSecs;

    correctBreakInputTimes();
    correctStudyInputTimes();

    //User shouldn't be able to cancel a timer if it isn't running yet.
    document.getElementById("startStudyBtn").disabled = false;
    document.getElementById("defaultBtn").disabled = true;
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

    document.getElementById("defaultBtn").addEventListener("click", function(){
        //Cancel the timer when the user clicks on the cancel button
        restoreTimerDefaults();
    })



    function restoreTimerDefaults(){
        studyTimeMins = defaultStudyTimeMins;
        studyTimeSecs = defaultStudyTimeSecs;

        breakTimeMins = defaultBreakTimeMins;
        breakTimeSecs = defaultBreakTimeSecs;


        document.getElementById("studyTimerMinutes").value = studyTimeMins;
        document.getElementById("studyTimerSeconds").value = studyTimeSecs;

        document.getElementById("breakTimerMinutes").value = breakTimeMins;
        document.getElementById("breakTimerSeconds").value = breakTimeSecs;

        correctBreakInputTimes();
        correctStudyInputTimes();

        resetSound();

    }


    function disableTimerValueInput(){
        document.getElementById("studyTimerMinutes").disabled = true;
        document.getElementById("studyTimerSeconds").disabled = true;

        document.getElementById("breakTimerMinutes").disabled = true;
        document.getElementById("breakTimerSeconds").disabled = true;

        document.getElementById("defaultBtn").disabled = true;
    }

    function enableTimerValueInput(){
        document.getElementById("startStudyBtn").disabled = false;
        document.getElementById("cancelStudyBtn").disabled = true;
        document.getElementById("defaultBtn").disabled = false;
        disableResetIfAlreadyDefault();
    }

    function enableCancelTimerButton(){
        document.getElementById("startStudyBtn").disabled = true;
        document.getElementById("cancelStudyBtn").disabled = false;
        document.getElementById("defaultBtn").disabled = true;
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

        document.getElementById("defaultBtn").style.borderColor = "white";
        document.getElementById("defaultBtn").style.color = "white";

        document.getElementById("siteLink").style.color = "white";
        document.getElementById("audioLink").style.color = "white";
        document.getElementById("iconLink").style.color = "white";

        document.getElementById("counterInfo").style.color = "white";
        document.getElementById("counterInfo").style.opacity = "0.5";

        document.getElementById("breakTimer").style.opacity = "0";
        document.getElementById("infoStudyTimer").style.opacity = "0";
        document.getElementById("infoBreakTimer").style.opacity = "0";

    }

    function studyStartSound(){
        var audio = new Audio('assets/study.mp3');
        audio.play();
    }

    function resetSound(){
        var audio = new Audio('assets/reset.mp3');
        audio.play();
    }

    function breakStartSound(){
        var audio = new Audio('assets/break.mp3');
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
            handleStudyTimerRunningFormatting();
            document.getElementById("studyTimerMinutes").value = studyTimeMins;
            document.getElementById("studyTimerSeconds").value = studyTimeSecs;
            document.title = studyTimeMins + ":" + studyTimeSecs;

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

        document.getElementById("defaultBtn").style.borderColor = "#0066cc";
        document.getElementById("defaultBtn").style.color = "#0066cc";


        document.getElementById("studyTimerMinutes").style.color = "#0066cc";
        document.getElementById("studyTimerDivider").style.color = "#0066cc";
        document.getElementById("studyTimerSeconds").style.color = "#0066cc";

        document.getElementById("siteLink").style.color = "#0066cc";
        document.getElementById("audioLink").style.color = "#0066cc";
        document.getElementById("iconLink").style.color = "#0066cc";

        document.getElementById("counterInfo").style.color = "#0066cc";
        document.getElementById("counterInfo").style.opacity = "1";

    }

    function startbreakTimer(){
        studyCounter++;
        document.getElementById('counterInfo').innerHTML = "Session " + studyCounter;
        breakStartSound();
        enableBreakModeStyling();
        breakTimeMins = initialBreakMinutes;
        breakTimeSecs = initialBreakSeconds;

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
            handleBreakTimerRunningFormatting();
            document.getElementById("studyTimerMinutes").value = breakTimeMins;
            document.getElementById("studyTimerSeconds").value = breakTimeSecs;
            document.title = breakTimeMins + ":" + breakTimeSecs;

            if (breakTimeMins == 0 && breakTimeSecs == 0) {
                //Stop the running timer
                clearInterval(breakTime);
                breakTime = null;
                //Add new timer values for the next study timer
                studyTimeMins = initialStudyMinutes;
                studyTimeSecs = initialStudySeconds;
                document.getElementById("studyTimerMinutes").value = studyTimeMins;
                document.getElementById("studyTimerSeconds").value = studyTimeSecs;
                studyStartSound();
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

        document.getElementById("defaultBtn").style.borderColor = "white";
        document.getElementById("defaultBtn").style.color = "white";

        document.getElementById("siteLink").style.color = "white";
        document.getElementById("audioLink").style.color = "white";
        document.getElementById("iconLink").style.color = "white";

        document.getElementById("breakTimer").style.opacity = "1";
        document.getElementById("infoStudyTimer").style.opacity = "1";
        document.getElementById("infoBreakTimer").style.opacity = "1";

        document.getElementById("studyTimerMinutes").disabled = false;
        document.getElementById("studyTimerSeconds").disabled = false;
        document.getElementById("breakTimerMinutes").disabled = false;
        document.getElementById("breakTimerSeconds").disabled = false;

        document.getElementById("counterInfo").style.color = "white";
        document.getElementById("counterInfo").style.opacity = "1";

    }

    function cancelStudyTimer(){
        //Stop any running timers
        document.title = "Just Study";
        studyCounter = 0;
        document.getElementById('counterInfo').innerHTML = "Session " + studyCounter;
        clearInterval(studyTime);
        clearInterval(breakTime);
        studyTime = null;
        breakTime = null;

        //Restore initial timer values
        document.getElementById("studyTimerMinutes").value = initialStudyMinutes;
        document.getElementById("studyTimerSeconds").value = initialStudySeconds;
        enableSetupModeStyling();
        correctStudyInputTimes();
        correctBreakInputTimes();

        //Allow user to input timer values again
        enableTimerValueInput();

        //Clear the value stored for the timer, a new value will be added when the next timer start
        studyTimeMins = null;
        studyTimeSecs = null;

        breakStartSound();
    }


    function correctStudyInputTimes(){
        //disable the reset button if the values present are already the default
        disableResetIfAlreadyDefault();
        //If input value is less than 10 then prefix a 0
        if( document.getElementById("studyTimerMinutes").value < 10){
            if( document.getElementById("studyTimerMinutes").value[0] != 0){
                document.getElementById("studyTimerMinutes").value= "0" +  document.getElementById("studyTimerMinutes").value;
            }
        }

        if(document.getElementById("studyTimerMinutes").value == 0){
            document.getElementById("studyTimerMinutes").value = "00";
        }

        if( document.getElementById("studyTimerSeconds").value < 10){
            if( document.getElementById("studyTimerSeconds").value[0] != 0){
                document.getElementById("studyTimerSeconds").value= "0" +  document.getElementById("studyTimerSeconds").value;
            }
        }

        if(document.getElementById("studyTimerSeconds").value == 0){
            document.getElementById("studyTimerSeconds").value = "00";
        }

        //If input value is greater than the allowed time then reduce the time to within limits
        if( document.getElementById("studyTimerMinutes").value > 90){
            document.getElementById("studyTimerMinutes").value = 90;
        }
        if( document.getElementById("studyTimerSeconds").value > 59){
            document.getElementById("studyTimerSeconds").value =59;
        }
    }

    function disableResetIfAlreadyDefault(){
        if(document.getElementById("studyTimerSeconds").value != defaultStudyTimeSecs || document.getElementById("studyTimerMinutes").value != defaultStudyTimeMins || document.getElementById("breakTimerSeconds").value != defaultBreakTimeSecs || document.getElementById("breakTimerMinutes").value != defaultBreakTimeMins){
            document.getElementById("defaultBtn").disabled = false;
        } else {
            document.getElementById("defaultBtn").disabled = true;
        }
    }
    function correctBreakInputTimes(){
        //disable the reset button if the values present are already the default
        disableResetIfAlreadyDefault();
        //If input value is less than 10 then prefix a 0
        if( document.getElementById("breakTimerMinutes").value < 10){
            if( document.getElementById("breakTimerMinutes").value[0] != 0){
                document.getElementById("breakTimerMinutes").value= "0" +  document.getElementById("breakTimerMinutes").value;
            }
        }
        if(  document.getElementById("breakTimerMinutes").value == 0){
            document.getElementById("breakTimerMinutes").value           = "00";
        }

        if( document.getElementById("breakTimerSeconds").value < 10){
            if( document.getElementById("breakTimerSeconds").value[0] != 0){
                document.getElementById("breakTimerSeconds").value= "0" + document.getElementById("breakTimerSeconds").value;
            }
        }
        if(document.getElementById("breakTimerSeconds").value == 0){
            document.getElementById("breakTimerSeconds").value = "00";
        }

        //If input value is greater than the allowed time then reduce the time to within limits
        if( document.getElementById("breakTimerMinutes").value > 90){
            document.getElementById("breakTimerMinutes").value = 90;
        }

        if( document.getElementById("breakTimerSeconds").value > 59){
            document.getElementById("breakTimerSeconds").value =59;
        }
    }

    function handleStudyTimerRunningFormatting(){
        //If input value is less than 10 then prefix a 0
        if(studyTimeSecs > 0 && studyTimeSecs < 10){
            if(studyTimeSecs[0] != "0"){
                studyTimeSecs = "0" + studyTimeSecs;
            }
        }

        if(studyTimeMins > 0 && studyTimeMins < 10){
            if(studyTimeMins[0] != "0"){
                studyTimeMins = "0" + studyTimeMins;
            }
        }

        if(studyTimeMins == 0){
            studyTimeMins = "00";
        }

        if(studyTimeSecs == 0){
            studyTimeSecs = "00";
        }
    }
    function handleBreakTimerRunningFormatting(){
        //If input value is less than 10 then prefix a 0
        if(breakTimeSecs > 0 && breakTimeSecs < 10){
            if(breakTimeSecs[0] != "0"){
                breakTimeSecs = "0" + breakTimeSecs;
            }
        }

        if(breakTimeMins> 0 && breakTimeMins< 10){
            if(breakTimeMins[0] != "0"){
                breakTimeMins= "0" + breakTimeMins;
            }
        }

        if(breakTimeMins == 0){
            breakTimeMins = "00";
        }

        if(breakTimeSecs == 0){
            breakTimeSecs = "00";
        }
    }

})
