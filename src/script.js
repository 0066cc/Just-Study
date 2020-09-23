document.addEventListener("DOMContentLoaded", function(event) {
    var studyTimeMins = 0;
    var studyTimeSecs = 10;

    var breakTimeMins = 0;
    var breakTimeSecs = 10;


    handleFormatting();
    document.getElementById("studyTimerMinutes").onchange = function(){handleFormatting()};
    document.getElementById("studyTimerSeconds").onchange = function(){handleFormatting()};

    document.getElementById("breakTimerMinutes").onchange = function(){handleFormatting()};
    document.getElementById("breakTimerSeconds").onchange = function(){handleFormatting()};

    document.getElementById("studyTimerMinutes").value = studyTimeMins;
    document.getElementById("studyTimerSeconds").value = studyTimeSecs;
    document.getElementById("breakTimerMinutes").value = breakTimeMins;
    document.getElementById("breakTimerSeconds").value = breakTimeSecs;


    document.getElementById("startStudyBtn").disabled = false;
    document.getElementById("cancelStudyBtn").disabled = true;
    var studyTime = null;
    var breakTime = null;

    var initialStudyMinutes = studyTimeMins;
    var initialStudySeconds = studyTimeSecs

        var initialBreakMinutes = breakTimeMins
        var initialBreakSeconds = breakTimeSecs


        document.getElementById("startStudyBtn").addEventListener("click", function(){
            console.log("jsdfg")
                console.log(document.getElementById("studyTimerMinutes").value)
                console.log(document.getElementById("studyTimerSeconds").value)
                console.log(document.getElementById("breakTimerMinutes").value)
                console.log(document.getElementById("breakTimerSeconds").value)


                initialStudyMinutes = document.getElementById("studyTimerMinutes").value;
            initialStudySeconds = document.getElementById("studyTimerSeconds").value;
            initialBreakMinutes = document.getElementById("breakTimerMinutes").value;
            initialBreakSeconds = document.getElementById("breakTimerSeconds").value;

            console.log("CALLED")
                console.log(initialStudyMinutes)
                console.log(initialStudySeconds)

                console.log(initialBreakMinutes)
                console.log(initialBreakSeconds)
                console.log("HJ")



                startStudyTimer()});
    document.getElementById("cancelStudyBtn").addEventListener("click", function(){ cancelStudyTimer()});



    // setInterval( checkFocus, 5000 );

    function checkFocus() {

        if ( document.hasFocus() ) {
        } else {
            alert("Get back here")
        }
    }


    function startStudyTimer(){

        console.log("STUDY")

            document.getElementById("studyTimerMinutes").disabled = true;
        document.getElementById("studyTimerSeconds").disabled = true;
        document.getElementById("breakTimerMinutes").disabled = true;
        document.getElementById("breakTimerSeconds").disabled = true;

        //studyTimeMins = document.getElementById("studyTimerMinutes").value;
        //studyTimeSecs = document.getElementById("studyTimerSeconds").value;

        //document.getElementById("studyTimerMinutes").value = studyTimeMins;
        //document.getElementById("studyTimerSeconds").value = studyTimeSecs;

        document.getElementById("startStudyBtn").disabled = true;
        document.getElementById("cancelStudyBtn").disabled = false;

        document.getElementById("container").style.backgroundColor = "#003366";
        document.getElementById("studyTimerMinutes").style.color = "white";
        document.getElementById("studyTimerDivider").style.color = "white";
        document.getElementById("studyTimerSeconds").style.color = "white";

        document.getElementById("startStudyBtn").style.borderColor = "white";
        document.getElementById("startStudyBtn").style.color = "white";

        document.getElementById("cancelStudyBtn").style.borderColor = "white";
        document.getElementById("cancelStudyBtn").style.color = "white";
        document.getElementById("credit").style.color = "white";


        document.getElementById("breakTimer").style.opacity = "0";
        document.getElementById("infoStudyTimer").style.opacity = "0";
        document.getElementById("infoBreakTimer").style.opacity = "0";

        studyTime = setInterval(function() {

            if(studyTimeSecs - 1 < 0){
                if(studyTimeMins != 0){
                    studyTimeMins = studyTimeMins - 1
                }
                studyTimeSecs = 59
            } else {
                studyTimeSecs = studyTimeSecs - 1
            }
            handleFormatting();
            document.getElementById("studyTimerMinutes").value = studyTimeMins;
            document.getElementById("studyTimerSeconds").value = studyTimeSecs;


            if (studyTimeMins == 0 && studyTimeSecs == 0) {
                clearInterval(studyTime);
                studyTime = null;
                breakTimeMins = initialBreakMinutes;
                breakTimeSecs = initialBreakSeconds;
                startbreakTimer();
            }
        }, 1000);
    }

    function startbreakTimer(){
        console.log("BREAK");

        document.getElementById("container").style.backgroundColor = "white";
        document.getElementById("startStudyBtn").style.borderColor = "#0066cc";
        document.getElementById("startStudyBtn").style.color = "#0066cc";

        document.getElementById("cancelStudyBtn").style.borderColor = "#0066cc";
        document.getElementById("cancelStudyBtn").style.color = "#0066cc";

        document.getElementById("studyTimerMinutes").style.color = "#0066cc";
        document.getElementById("studyTimerDivider").style.color = "#0066cc";
        document.getElementById("studyTimerSeconds").style.color = "#0066cc";

        document.getElementById("credit").style.color = "#0066cc";

        breakTime = setInterval(function() {

            if(breakTimeSecs - 1 < 0){
                if(breakTimeMins != 0){
                    breakTimeMins = breakTimeMins - 1;
                }
                breakTimeSecs = 59;
            } else {
                breakTimeSecs = breakTimeSecs - 1
            }
            handleFormatting();
            document.getElementById("studyTimerMinutes").value = breakTimeMins;
            document.getElementById("studyTimerSeconds").value = breakTimeSecs;


            if (breakTimeMins == 0 && breakTimeSecs == 0) {
                clearInterval(breakTime);
                breakTime = null;
                console.log("NEXT")
                    studyTimeMins = initialStudyMinutes;
                studyTimeSecs = initialStudySeconds;
                document.getElementById("studyTimerMinutes").value = studyTimeMins;
                document.getElementById("studyTimerSeconds").value = studyTimeSecs;


                startStudyTimer();
            }
        }, 1000);
    }


    function cancelStudyTimer(){
        clearInterval(studyTime);
        studyTime = null;
        clearInterval(breakTime);
        breakTime = null;

        document.getElementById("studyTimerMinutes").value = initialStudyMinutes;
        document.getElementById("studyTimerSeconds").value = initialStudySeconds;

        document.getElementById("startStudyBtn").disabled = false;
        document.getElementById("cancelStudyBtn").disabled = true;

        document.getElementById("container").style.backgroundColor = "#0066cc";
        document.getElementById("studyTimerMinutes").style.color = "white";
        document.getElementById("studyTimerDivider").style.color = "white";
        document.getElementById("studyTimerSeconds").style.color = "white";

        document.getElementById("startStudyBtn").style.borderColor = "white";
        document.getElementById("startStudyBtn").style.color = "white";

        document.getElementById("cancelStudyBtn").style.borderColor = "white";
        document.getElementById("cancelStudyBtn").style.color = "white";
        document.getElementById("credit").style.color = "white";



        document.getElementById("breakTimer").style.opacity = "1";
        document.getElementById("infoStudyTimer").style.opacity = "1";
        document.getElementById("infoBreakTimer").style.opacity = "1";

        document.getElementById("studyTimerMinutes").disabled = false;
        document.getElementById("studyTimerSeconds").disabled = false;
        document.getElementById("breakTimerMinutes").disabled = false;
        document.getElementById("breakTimerSeconds").disabled = false;


        studyTimeMins = initialStudyMinutes;
        studyTimeSecs = initialStudySeconds;

        handleFormatting()
            document.getElementById("studyTimerMinutes").value = studyTimeMins;
        document.getElementById("studyTimerSeconds").value = studyTimeSecs;


    }



    function handleFormatting(){
        if( document.getElementById("studyTimerMinutes").value < 10){
            if( document.getElementById("studyTimerMinutes").value[0] != "0"){
                document.getElementById("studyTimerMinutes").value= "0" +  document.getElementById("studyTimerMinutes").value
            }
        }
        if( document.getElementById("studyTimerSeconds").value < 10){
            if( document.getElementById("studyTimerSeconds").value[0] != "0"){
                document.getElementById("studyTimerSeconds").value= "0" +  document.getElementById("studyTimerSeconds").value
            }
        }
        if( document.getElementById("breakTimerMinutes").value < 10){
            if( document.getElementById("breakTimerMinutes").value[0] != "0"){
                document.getElementById("breakTimerMinutes").value= "0" +  document.getElementById("breakTimerMinutes").value
            }
        }
        if( document.getElementById("breakTimerSeconds").value < 10){
            if( document.getElementById("breakTimerSeconds").value[0] != "0"){
                document.getElementById("breakTimerSeconds").value= "0" +  document.getElementById("breakTimerSeconds").value
            }
        }
        if( document.getElementById("studyTimerMinutes").value > 90){
            document.getElementById("studyTimerMinutes").value = 90
        }
        if( document.getElementById("studyTimerSeconds").value > 59){
            document.getElementById("studyTimerSeconds").value =59
        }
        if( document.getElementById("breakTimerMinutes").value > 90){
            document.getElementById("breakTimerMinutes").value = 90
        }
        if( document.getElementById("breakTimerSeconds").value > 59){
            document.getElementById("breakTimerSeconds").value =59
        }

        if(studyTimeSecs < 10){
            if(studyTimeSecs[0] != "0"){
                studyTimeSecs = "0" + studyTimeSecs
            }
        }
        if(studyTimeMins < 10){
            if(studyTimeMins[0] != "0"){
                studyTimeMins = "0" + studyTimeMins
            }
        }

        if(breakTimeMins < 10){
            if(breakTimeMins[0] != "0"){
                breakTimeMins = "0" + breakTimeMins
            }
        }
        if(breakTimeSecs< 10){
            if(breakTimeSecs[0] != "0"){
                breakTimeSecs = "0" + breakTimeSecs
            }
        }

    }

    document.onbeforeunload = function() {

    }
});
