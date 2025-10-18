let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

if (!started){
    $("#level-title").text("Press A Key to Start");
}

function playgame(){

    $(document).keydown(function(){
        if (!started){
        started = true;
        nextSequence();
        }
    });
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

//Animate button press
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 150);
}


//Generate next sequence
function nextSequence(){
    //Reset userClickedPattern to empty array
    userClickedPattern = [];
//Generate random Number between 0-3
    let randomNumber = Math.floor(Math.random() * 4);

    //Select random color from buttonColors array
    let randomChosenColor = buttonColors[randomNumber];
    //Add the selected color to gamePattern array
    gamePattern.push(randomChosenColor);
    console.log(`The color game pattern is ${gamePattern}`);


    //Animate the selected color
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play sound for the selected color
    let audio = new Audio(`sounds/${randomChosenColor}.mp3`);
    audio.play();

    
    level++;
    $("#level-title").text("Level " + level);


}

//Check the user's answer
function checkAnswer(currentLevel) {

    //Check if the most recent user answer is the same as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        console.log(`This is ${gamePattern[currentLevel]} and ${userClickedPattern[currentLevel]}`);

        //Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
        
            //Call nextSequence after a 1 second delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        //If the user got the answer wrong
    } else {
        console.log("wrong");
        $("body").addClass("game-over");

        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call startOver function to reset the game
        startOver();

    }
}

//Detecting button clicks
$(".btn").click(function(){
    //Get the id of the clicked button
    let userChosenColor = $(this).attr("id");
    console.log(userChosenColor);

    //Animate the button press
    animatePress(userChosenColor);

    //Add the clicked color to userClickedPattern array
    userClickedPattern.push(userChosenColor);
    console.log(`The color user clicked pattern is ${userClickedPattern}`);

    
    let audio = new Audio(`sounds/${userChosenColor}.mp3`);
    audio.play();
    

    checkAnswer(userClickedPattern.length - 1);

});





//Start the game
playgame();

