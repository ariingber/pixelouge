

var computer;
var currentPlayer = 'player 1'
var player;
var timer;
var interval;
var player1time;
var computer2;
var player2;
var timer2;
var interval;
var player2time;

  function Timer () {

    this.time = 0;
    var time = 0;
    this.startTime = function () {
        interval = setInterval ( function () {
        time = time += 1;
        $("#timer").text(time + " seconds");
        this.time = time; }, 1000);
      }
    this.stopTimer = function() {
      clearInterval (interval);
    }
  }

  function Board () {
    this.timer
    $(".psquare").css("background-color","white")
    this.playersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    this.playerTime = 0;
    this.checkIfSolved = function () {
      var playerCheck = [];
      var computerCheck = [];
      var check = false;
      for (var i = 0; i < this.playersPad.length; i++){
        var tempArray = this.playersPad[i];
        for (var j = 0; j < tempArray.length; j++) {
          playerCheck.push(tempArray[j]);
        }
      }
      for (var i = 0; i < this.computersPad.length; i++){
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
        timer.stopTimer ()

        console.log('its working lauch into finsish screen')
        console.log(time);
        if (currentPlayer === 'player 1') {
          player1time = time;
          currentPlayer = 'player 2';
          setPlayer2 ();
          check = false;
        } else { console.log('player 2 finished')}
      }
    }
    this.playerSelectpad = function () {
      checkIfSolved = this.checkIfSolved;
      playersPad = this.playersPad;
      computersPad = this.computersPad;
      $(".psquare").on('click', function(e) {
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

  function CompuPad () {
    this.computersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    $(".csquare").css("background-color","white")
    for (var i = 1; i <= 15; i++) {
      var numbers = [0,1,2,4];
      var randomVal1 = numbers[Math.floor(Math.random()*numbers.length)];
      var randomVal2 = numbers[Math.floor(Math.random()*numbers.length)];
      cSqClr = this.computersPad[randomVal1][randomVal2];
      this.computersPad[randomVal1][randomVal2] = 'black';
      $("#"+"c"+randomVal1+""+[randomVal2]).css("background-color","black");//changes appropriate square black

    }
  }

  function setPlayer2 () {
    $(".boardsContainer").hide();
    $(".player2start").show();
  }



$(document).ready(function() {
    $(".player2start").hide();
    alert("everything is ready")
//game starts here
  $(".player1start").on('click', function () {
    alert('this game has begun')
    $(".player1start").hide();
    computer =  new CompuPad();
    player = new PlayersPad();
    timer = new Timer ();
    timer.startTime()
    player.playerSelectpad();
    $(".player2start").on('click', function () {
      alert('player 2 has begun')
      $(".player1start").hide();
      $(".player2start").hide();
      computer =  new CompuPad();
      console.log(computer.computersPad)
      player = new PlayersPad();
      console.log(player.playersPad)
      timer = new Timer ();
      timer.startTime()
      player.playerSelectpad();
      $(".boardsContainer").show();

    });

  });



});
