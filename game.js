var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");      // used to find out which button is clicked
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    started = true;
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(buttonColours.indexOf(userChosenColour));
});

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    //1. Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColour);


    $("h1").text("Level "+level);
    level += 1;

    userClickedPattern = [];
    
  };
function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");
    // console.log($("#"+currentColour).hasClass("pressed"));
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },20);

}

$(document).keypress(function (){
    nextSequence();
   
});


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio  = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}