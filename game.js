// alert("game on");

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];

var started = false;
var level = 0

var hint = false;

//what to do once keypressed -> press any key to start the game
$(document).on('keypress',function(e) {
    if (!started) {
      $("#level-title").text("Level 0");
      started = true;
      nextSequence();
    }
    if (e.key === "h"){
      hint = true;
    }
});

//what to do once .btn class (button) clicked
$(".btn").on("click", function() {
  userChosenColor = this.id; //==$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  randomNum =  Math.floor(Math.random() * 4); // Returns a random integer from 0 to 3:
  randomChosenColor = buttonColors[randomNum];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  if (hint){
    $("#level-title").text(gamePattern);
  }

}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(index){
  if (userClickedPattern[index] === gamePattern[index]){
    //console.log(userClickedPattern);
    //console.log(gamePattern);
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("body").css(".game-over");
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  started = false;
  $("#level-title").text("Level "+ level + " press any key to restart the game!");
  level=0;
  hint = false;
}
