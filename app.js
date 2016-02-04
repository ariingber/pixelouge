$(document).ready(function() {
  $(".player2start").hide();
  alert("everything is ready")



  var playersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
  ['white','white','white','white','white'],['white','white','white','white','white'],
  ['white','white','white','white','white']];
  var computersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
  ['white','white','white','white','white'],['white','white','white','white','white'],
  ['white','white','white','white','white']];

  var player1time;
  var player2time;
  var $button = $('button');
  var $player = $(".player");
  var $computer = $(".computer");
  var time = 0;
  var currentPlayer = 'player 1';

  function Timer () {
    var interval = setInterval(function() {
      time = time += 1; $("#timer").text(time + " seconds")}, 1000);
    this.stopTimer = function() {
      clearInterval(interval);
    }
  }

  function compuPadGenerate (){
    for (var i = 1; i <= 15; i++) {
      var numbers = [0,1,2,4];
      var randomVal1 = numbers[Math.floor(Math.random()*numbers.length)];
      var randomVal2 = numbers[Math.floor(Math.random()*numbers.length)];
      cSqClr = computersPad[randomVal1][randomVal2];
      computersPad[randomVal1][randomVal2] = 'black';
      $("#"+"c"+randomVal1+""+[randomVal2]).css("background-color","black");//changes appropriate square black

    }
  }

  // this allows player to click squares to match puzzle they can click on and
  // off squares this method also checks to see if player has completed puzzle
  // it should also include code for starting , stoping and saving timer data
  function playerSelectpad() {
    $($player).on('click', function(e) {
      console.log(playersPad);
      console.log(currentPlayer);
      $square = $(e.toElement);
      $sqursIdStrg = $square.attr('id');
      // console.log($sqursIdStrg);
      sqrsIdStrgAr = $sqursIdStrg.split('');
      // console.log(sqrsIdStrgAr);
      sqClr = playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])];
      // console.log(sqClr);
      if (sqClr === null || sqClr === 'white') {
        playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])] = 'black';
        // console.log(playersPad);
        $($square).css("background-color","black");//changes appropriate square black
      } else {
        playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])] = 'white';
        $($square).css("background-color","white");//changes back to white
      };

      //Comparing to see if player has completed puzzle
    var playerCheck = [];
    var computerCheck = [];
    var check = false;
    for (var i = 0; i < playersPad.length; i++){
      var tempArray = playersPad[i];
      for (var j = 0; j < tempArray.length; j++) {
        playerCheck.push(tempArray[j]);
      }
    }
    for (var i = 0; i < computersPad.length; i++){
      var cTempArray = computersPad[i];
      for (var j = 0; j < cTempArray.length; j++) {
        computerCheck.push(cTempArray[j]);
      }
    }
    for (var i=0; i < playerCheck.length; i++) {
      if (playerCheck[i] === computerCheck[i]) { check = true } else { return false }
    }

    // when player solves puzzle switch to save time and switch to 2
    // when player 2 has solved the puzzle show who won
    if (check === true) {
      timer.stopTimer ()
      console.log('its working lauch into finsish screen')
      console.log(time);
      if (currentPlayer === 'player 1') {
        player1time = time;
        currentPlayer = 'player 2';
        startPlayer2();
        //resetBoard
      } else { console.log('player 2 finished')}
    }
    });
  };

  function startPlayer2() {
    $(".boardsContainer").hide();
    $(".player2start").show();
    alert('coundown to player too starts')
    playersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    computersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
  }

//game starts here
  $($button).on('click', function (){
    alert('this game has begun')
    $(".player1start").hide();
    compuPadGenerate ();
    playerSelectpad();
    timer = new Timer();
    $(".player2start").on ('click', function () {
      alert('trying to start player 2')
      $(".player2start").hide();
      $(".boardsContainer").show();
      $('.square').css("background-color","white");
      compuPadGenerate ();
      playerSelectpad();
    })

    // startPlayer2();

  });



});
