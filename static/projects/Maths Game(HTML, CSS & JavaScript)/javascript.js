var playing = false;
var score = 0;
var action;
var timeRem;
var correctAnswer;

//if start Game button is clicked
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true)
    {
        //reload the page
        location.reload();
    }
    else  //if we are not playing
    {
        //now we are playing
        playing = true;
        hide("gameover");

        //set score to 0
        score = 0;
        setValue("scoreValue",score);
        //document.getElementById("scoreValue").innerHTML = score;

        //time remaining block will be shown
        show("timeremaining");
        timeRem = 60;
        setValue("timeremainingvalue", timeRem);

        //start game text changes to reset game
        setValue("startreset","Reset Game");

        //start Countdown
        startCountdown();

        //generate a new Q/A
        generateQA();

    }

    // clicking on the answer box
    for(i=1;i<5;i++)
    {
        document.getElementById("box"+i).onclick = function()
        {
            //check if we are playing
            if(playing == true)
            {
                if(this.innerHTML == correctAnswer)
                {
                    //increase score by 1
                    score++;
                    setValue("scoreValue",score);

                    //hide wrong box and show correct
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){
                        hide("correct");
                    },1000);

                    //generate a new QA
                    generateQA();
                }
                else
                {
                    //wrong answer
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },1000);
                }
            }
        }
    }


    function startCountdown(){
        action = setInterval(function(){
            if(timeRem>0)
            {
                timeRem--;
                setValue("timeremainingvalue", timeRem);
            }
            else //game is over
            {
                stopCountdown();
                show("gameover");
                setValue("gamescorevalue", score);
                hide("timeremaining");
                hide("correct");
                hide("wrong");
                playing = false;
                setValue("startreset","Start Game");

            }
        },1000);
    }

    function stopCountdown(){
        clearInterval(action);
    }
    
    function hide(Id)
    {
        document.getElementById(Id).style.display = "none";
    }
    function show(Id)
    {
        document.getElementById(Id).style.display = "block";
    }
    function setValue(Id, value)
    {
        document.getElementById(Id).innerHTML = value;
    }


    //generating Question and Answer
    function generateQA(){
        var x = 1 + Math.round(9*Math.random());
        var y = 1 + Math.round(9*Math.random());

        correctAnswer = x*y;

        setValue("question", x+"x"+y);

        var correctPosition = 1 + Math.round(3*Math.random());
        setValue("box"+correctPosition, correctAnswer);
        
        var answers = [correctAnswer];
        for(i=1;i<5;i++)
        {
            var anyValue;
            if(i != correctPosition)
            {
                do{
                    anyValue = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
                }
                while(answers.indexOf(anyValue) > -1)
                setValue("box"+i, anyValue);
                answers.push(anyValue);
            }
        }
    }

}
