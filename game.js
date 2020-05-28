
var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function()
{
  if(!started)
  {
    nextSquence();
    started=true;
  }
});

$(".btn").on("click",clickfun);

function clickfun(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);


}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("sucess");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){nextSquence()}, 1000);
    }
  }
  else
  {
    wrong();
  }
}

function nextSquence()
{
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeOut(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
       $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function wrong()
{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game over, press any key to restart");
  startOver();
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
