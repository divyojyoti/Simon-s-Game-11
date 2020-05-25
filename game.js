var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level =0;
var click =0;
var gameOver = false;
var gameOn = false;
$(document).on("keydown", function(){
    if (!gameOn){
        startOver();
       
    }
    
});
function nextSequence(){
    $("h1").text("Level " + ++level);
    var randomNumber = Math.floor(Math.random()*4 );
    var randomChosenColour = buttonColours[randomNumber];
    $("." + randomChosenColour).fadeOut(100);
    $("." + randomChosenColour).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("sequence: "+gamePattern);
}
$(document).click(function (event) {
    var userChosenColour = event.target.id;
    if(buttonColours.indexOf(userChosenColour) >= 0){
        animatePress(userChosenColour);
        playSound(userChosenColour);
        if (gameOver || !gameOn) {
            gameOverFunc();
            return;
        }
        

        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        click++;
        if(click<=level){
            checkAnswer(userClickedPattern);
            if(click==level && gameOn){
                click=0;
                setTimeout(function(){
                    nextSequence();
                }, 1000);
               
                userClickedPattern.length=0;

            }
        }
        
        
    }
    
});

function playSound(name){
var sound = new Audio("sounds/" + name + ".mp3");
sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
         $("#" + currentColour).removeClass("pressed");
    },100);
   
}

function checkAnswer(userClickedPattern){
    for (var i = 0; i < userClickedPattern.length; i++){
    
        if(userClickedPattern[i]==gamePattern[i]){
            console.log("right");
        }
        else{
            console.log("wrong");
            
            gameOverFunc();
            return;
        }
    } 
}

function gameOverFunc(){
    gameOver = true;
    gameOn = false;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
     $("h2").css("display", "none");
     gameOn = true;
     gameOver = false;
     gamePattern = [];
     userClickedPattern = [];
     level = 0;
     click = 0;
     nextSequence();
}