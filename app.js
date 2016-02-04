$(document).ready(function() {
  $(".player2start").hide();
  alert("everything is ready")

var computer;
var player;

  function Timer () {
    var interval = setInterval(function() {
      time = time += 1; $("#timer").text(time + " seconds")}, 1000);
    this.stopTimer = function() {
      clearInterval(interval);
    }
  }

  // this allows player to click squares to match puzzle they can click on and
  // off

  function PlayersPad () {
    $(".playerpad").css("background-color","white")
    this.playersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    this.playertime = 0;
    // this.timer = new Timer();
    this.currentPlayer = 'player 1';
    this.checkIfSolved = function () {
      var playerCheck = [];
      var computerCheck = [];
      var check = false;
      for (var i = 0; i < player.playersPad.length; i++){
        var tempArray = player.playersPad[i];
        for (var j = 0; j < tempArray.length; j++) {
          playerCheck.push(tempArray[j]);
        }
      }
      for (var i = 0; i < computer.computersPad.length; i++){
        var cTempArray = computer.computersPad[i];
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
        this.timer.stopTimer ()
        console.log('its working lauch into finsish screen')
        console.log(time);
        if (currentPlayer === 'player 1') {
          player1time = time;
          currentPlayer = 'player 2';
          // startPlayer2();
          //resetBoard
        } else { console.log('player 2 finished')}
      }
    }
    this.playerSelectpad = function () {
      checkIfSolved = this.checkIfSolved;
      playersPad = this.playersPad;
      computersPad = this.computersPad;
      $(".square").on('click', function(e) {
        $square = $(e.toElement);
        $sqursIdStrg = $square.attr('id');
        sqrsIdStrgAr = $sqursIdStrg.split('');
        sqClr = playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])];
        if (sqClr === null || sqClr === 'white') {
          playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])] = 'black';
          $($square).css("background-color","black");//changes appropriate square black
        } else {
          playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])] = 'white';
          $($square).css("background-color","white");//changes back to white
        };
        checkIfSolved();
      });
    }
  }



  function CompuPad (){
    this.computersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    $(".computerpad").css("background-color","white")
    for (var i = 1; i <= 15; i++) {
      var numbers = [0,1,2,4];
      var randomVal1 = numbers[Math.floor(Math.random()*numbers.length)];
      var randomVal2 = numbers[Math.floor(Math.random()*numbers.length)];
      cSqClr = this.computersPad[randomVal1][randomVal2];
      this.computersPad[randomVal1][randomVal2] = 'black';
      $("#"+"c"+randomVal1+""+[randomVal2]).css("background-color","black");//changes appropriate square black

    }
  }

  function startPlayer2() {
    $(".boardsContainer").hide();
    $(".player2start").show();
    alert('coundown to player too starts')
  }

//game starts here
  $(".player1start").on('click', function () {
    alert('this game has begun')
    $(".player1start").hide();
    computer =  new CompuPad();
    player = new PlayersPad();
    player.playerSelectpad();

  });



});
