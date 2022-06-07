var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userInputPattern = [];
var level = 0;

function buttonClick(color) {
  var audio = new Audio('./sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(color) {
  $('#' + color).addClass('pressed');
  setTimeout(function() {
    $('#' + color).toggleClass('pressed');
  }, 100);
}

$('.btn').click(function() {
  var $this = $(this);
  var color = $this.attr('id');
  userInputPattern.push(color);
  buttonClick(color);
  animatePress(color);
  checkAnswer(userInputPattern.length-1);
});

function newSequence() {
  level++;
  userInputPattern = [];
  $('h1').html('level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var color = buttonColors[randomNumber];
  gamePattern.push(color);
  $('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  buttonClick(color);
}

function restartGame() {
  userInputPattern = [];
  gamePattern = [];
  level = 0;
  newSequence();
}

function checkAnswer(currentLevel) {

  if(userInputPattern[currentLevel] === gamePattern[currentLevel]){
    if(userInputPattern.length === gamePattern.length){
      console.log('success');
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  }
  else{
    console.log('fail');
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();

    $('h1').html('<h4>Game Over!</h4> <h6>Restarting...</h6>');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').toggleClass('game-over');
    }, 100);
    setTimeout(function () {
      restartGame();
    }, 3000);
}
}

$(document).ready(function(){
  setTimeout(function () {
    newSequence();
  }, 3000);
});
