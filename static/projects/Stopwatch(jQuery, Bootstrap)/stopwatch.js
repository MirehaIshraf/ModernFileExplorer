$(function(){
    //variables
    var mode = false;
    var timeCounter =0;
    var lapCounter =0;
    var action;
    var lapNumber =0;

    var timeMinutes, timeSeconds, timeCentiseconds,lapMinutes, lapSeconds, lapCentiseconds;

    //on app load show start and lap button
    hideshowButtons("#startButton", "#lapButton");

    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = true;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start Counter
        startAction();
    })

    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //stop counter
        clearInterval(action);
    });

    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });

    //click on ResetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });

    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is on
        if(mode == true)
        {
            //stop action
            clearInterval(action);
            //resetlap and print lap details
            lapCounter=0;
            addLap();

            //start action
            startAction();
        }
    });




    
    //functions

    //shows two buttons
    function startAction(){
        action =setInterval(function(){
            timeCounter++;
            lapCounter++;
            updateTime();
        },10);
    }

    //start the counter
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //updateTime: converts counters to min,sec and centiseconds
    function updateTime(){
        //1min = 60*100 centisecs = 6000 centisecs
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec = 100centisecs
        timeSeconds = Math.floor((timeCounter%6000)/100);
        //1centisecs
        timeCentiseconds = (timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
       

        //1min = 60*100 centisecs = 6000 centisecs
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec = 100centisecs
        lapSeconds = Math.floor((lapCounter%6000)/100);
        //1centisecs
        lapCentiseconds = (lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    //format numbers
    function format(number){
        if(number<10)
            return '0'+number;
        else return number;
    }

    //addLap function
    function addLap(){
        lapNumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(myLapDetails).prependTo("#laps");
    }

});