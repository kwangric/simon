var gamePattern = [];
var buttonColors = ["korone", "polka", "pekora", "suisei"];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var newButton = gamePattern[gamePattern.length - 1];
  $("#" + newButton).fadeOut(100).fadeIn(100);
  playSound(newButton);
  level += 1;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var buttonAudio = new Audio("sounds/" + name + ".mp3");
  buttonAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  }
  else {
    playSound("gawr");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
