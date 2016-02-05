var playersPad;
var computersPad;
var player1time;
var player2time;
var check = false;
var currentPlayer = 'player 1';


  var checkIfSolved = function () {
    var playerCheck = [];
    var computerCheck = [];
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
      if (playerCheck[i] === computerCheck[i]) {
        check = true;
      } else {
        check = false; break;
      }
    }
  }

  var stopOrPlayerSwitch = function () {
    if (check === true) {
      timer.stopTimer ();
      if (currentPlayer === 'player 1') {
        player1time = time;
        currentPlayer = 'player 2';
        setPlayer2 ();
        check = false;
      } else {
        player2time = time;
        check = false;
        showWinner ();
      }
    }
  }

  function Timer () {
    this.time = 0;
    var time = 0;
    this.startTime = function () {
      if (currentPlayer === 'player 1') {
        interval = setInterval ( function () {
        time = time += 1;
        $("#plyr1").text(time + " seconds");
        this.time = time; }, 1000);
      } else {
        interval = setInterval ( function () {
          time = time += 1;
          $("#plyr2").text(time + " seconds");
          this.time = time; }, 1000);
        }
    }
    this.stopTimer = function() {
      clearInterval (interval);
    }
  }

  function PlayersPad () {
    this.newPlayersPad = function () {
      playersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
      ['white','white','white','white','white'],['white','white','white','white','white'],
      ['white','white','white','white','white']];
      $(".psquare").css("background-color","white");
      playersTime = 0;
    }

    this.playerSelectpad = function () {
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
        stopOrPlayerSwitch();
      });

    }
  }

  function CompuPad () {
    computersPad = [['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white'],['white','white','white','white','white'],
    ['white','white','white','white','white']];
    $(".csquare").css("background-color","white")
    for (var i = 1; i <= 15; i++) {
      var numbers = [0,1,2,4];
      var randomVal1 = numbers[Math.floor(Math.random()*numbers.length)];
      var randomVal2 = numbers[Math.floor(Math.random()*numbers.length)];
      cSqClr = computersPad[randomVal1][randomVal2];
      computersPad[randomVal1][randomVal2] = 'black';
      $("#"+"c"+randomVal1+""+[randomVal2]).css("background-color","black");//changes appropriate square black

    }
  }

  function setPlayer2 () {
    $(".csquare").css("background-color", "white");
    $(".psquare").css("background-color","white");
    $(".csquare").show();
    // $("#currentPlayer").text("player two");
    $(".player2start").show();
  }

  function showWinner () {
    if (player2time > player1time) {
      $('#finalMessage').text('PLAYER ONE WINS');
      $('#finalMessage').animate({fontSize: "3em"}, 1500);
    } else if (player1time > player2time){
      $('#finalMessage').text('PLAYER TWO WINS');
      $('#finalMessage').animate({fontSize: "3em"}, 1500)
    } else {
      $('#finalMessage').text('ITS A TIE');
      $('#finalMessage').animate({fontSize: "3em"}, 1500)
    }
  }

  function showPlayer2 () {
    $(".boardsContainer").show();
    $(".player2start").hide();
  }
  function openingAnimation () {
    $("h1").animate({fontSize: "7em"}, 1500);
    $(".psquare").animate({backgroundColor: 'red'}, 1500);
    $(".csquare").animate({backgroundColor: 'red'}, 1600);
  }

$(document).ready(function() {
  openingAnimation ();

  $(".player2start").hide();
  $(".player1start").on('click', function () {
    setTimeout (function() {
      $('.csquare').hide();
    }, 7000);
    $(".player1start").hide();
    computer =  new CompuPad();
    player = new PlayersPad();
    player.newPlayersPad();
    player.playerSelectpad();
    timer = new Timer();
    timer.startTime();
  });
  $(".player2start").on('click', function () {
    setTimeout (function() {
      $('.csquare').hide();
    }, 7000);
    computer2 =  new CompuPad();
    player2 = new PlayersPad();
    player2.newPlayersPad();
    showPlayer2();
    timer2 = new Timer();
    timer2.startTime();
  });
});
