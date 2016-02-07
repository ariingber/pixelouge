
var playersPad;
var computersPad;
var player1time;
var player2time;
var check = false;
var currentPlayer = 'player 1';
var player1wins = 0;
var player2wins = 0;
var ties = 0;
var games = 0;

var $finalMessage = $( '#finalMessage' );
var $surrender = $( '.surrender' );
var $player2start = $( '.player2start' );
var $player1start = $( '.player1start' );
var $csquare = $( '.csquare' );
var $psquare = $( '.psquare');
var $plyr1 = $( '#plyr1' );
var $plyr2 = $( '#plyr2' );
var $man = $( '#man' );
var $machine = $( '#machine' );
var $anotherRound = $( '.anotherRound' );

  var checkIfSolved = function () {
    var playerCheck = [];
    var computerCheck = [];
    for ( var i = 0; i < playersPad.length; i++ ) {
      var tempArray = playersPad[ i ];
      for ( var j = 0; j < tempArray.length; j++ ) {
        playerCheck.push( tempArray[ j ] );
      }
    }
    for ( var i = 0; i < computersPad.length; i++ ) {
      var cTempArray = computersPad[ i ];
      for ( var j = 0; j < cTempArray.length; j++ ) {
        computerCheck.push( cTempArray[ j ] );
      }
    }
    for ( var i = 0; i < playerCheck.length; i++ ) {
      if ( playerCheck[ i ] === computerCheck[ i ] ) {
        check = true;
      } else {
        check = false;
        break;
      }
    }
  }

  var endGameOrPlayerSwitch = function () {
    if ( check === true ) {
      $psquare.animate( { backgroundColor: 'orange' }, 200);
      $csquare.animate( { backgroundColor: 'orange' }, 200);
      $psquare.animate( { backgroundColor: 'pink' }, 200);
      $csquare.animate( { backgroundColor: 'pink' }, 200);
      $psquare.animate( { backgroundColor: 'yellow' }, 200);
      $csquare.animate( { backgroundColor: 'yellow' }, 200);
      $psquare.animate( { backgroundColor: 'green' }, 200);
      $csquare.animate( { backgroundColor: 'green' }, 200);
      $psquare.animate( { backgroundColor: 'blue' }, 200);
      $csquare.animate( { backgroundColor: 'blue' }, 200);
      timer.stopTimer ();
      if ( currentPlayer === 'player 1') {
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
      if ( currentPlayer === 'player 1' ) {
        interval = setInterval ( function () {
        time = time += 1;
        $plyr1.text( time + ' seconds' );
        this.time = time; }, 1000);
      } else {
        interval = setInterval ( function () {
          time = time += 1;
          $plyr2.text( time + ' seconds');
          this.time = time; }, 1000);
        }
    }
    this.stopTimer = function() {
      clearInterval ( interval );
    }
  }

  function PlayersPad () {
    this.newPlayersPad = function () {
      playersPad = [ ['white','white','white','white','white'],
      ['white','white','white','white','white'],
      ['white','white','white','white','white'],
      ['white','white','white','white','white'],
      ['white','white','white','white','white' ]];
      $('.psquare').css('background-color','white');
      playersTime = 0;
    }

    this.playerSelectpad = function () {
      $psquare.on( 'click', function (e) {
        $square = $(e.toElement);
        $sqursIdStrg = $square.attr("id");
        sqrsIdStrgAr = $sqursIdStrg.split('');
        // complex looking code but just changes element w/ ids color
        sqClr = playersPad[Number.parseInt(sqrsIdStrgAr[0])]
        [Number.parseInt(sqrsIdStrgAr[1])];
        if (sqClr === null || sqClr === 'white') {
          playersPad[Number.parseInt(sqrsIdStrgAr[0])]
          [Number.parseInt(sqrsIdStrgAr[1])] = 'black';
          $($square).css('background-color','black');
          //changes appropriate square black
        } else {
          playersPad[Number.parseInt(sqrsIdStrgAr[0])]
          [Number.parseInt(sqrsIdStrgAr[1])] = 'white';
          $($square).css('background-color','white');
          //changes back to white
        };
        checkIfSolved();
        endGameOrPlayerSwitch();
      });

    }
  }

  function CompuPad () {
    computersPad = [ ['white','white','white','white','white'],
    ['white','white','white','white','white'],
    ['white','white','white','white','white'],
    ['white','white','white','white','white'],
    ['white','white','white','white','white'] ];
    $csquare.css( 'background-color', 'white' )
    for ( var i = 1; i <= 15; i++ ) {
      var numbers = [ 0, 1, 2, 4 ];
      var randomVal1 = numbers[ Math.floor ( Math.random() *numbers.length ) ];
      var randomVal2 = numbers[ Math.floor ( Math.random() *numbers.length ) ];
      cSqClr = computersPad[ randomVal1 ][ randomVal2 ];
      //changes appropriate square black
      computersPad[ randomVal1 ][ randomVal2 ] = 'black';
      $('#' + 'c' + randomVal1 + '' +
      [ randomVal2 ] ).css('background-color', 'black');
    }
  }

  function setPlayer2 () {
    $csquare.css( 'background-color', 'red' );
    $psquare.css( 'background-color','red' );
    $csquare.show();
    $player2start.show();
    $surrender.hide();
    $plyr1.animate({color: 'black'}, 750);
    $plyr1.animate({fontSize: '1em'}, 1500);
    $plyr2.animate({color: 'green'}, 750);
    $plyr2.animate({fontSize: '2em'}, 1500);
  }

  function showWinner () {
    if ( player2time > player1time ) {
      $finalMessage.text('PLAYER ONE WINS');
      $finalMessage.animate({fontSize: '3em'}, 1500);
      player1wins ++;
    } else if ( player1time > player2time ){
      $finalMessage.text('PLAYER TWO WINS');
      $finalMessage.animate( { fontSize: '3em' }, 1500);
      player2wins ++;
    } else {
      $finalMessage.text( 'ITS A TIE' );
      $finalMessage.animate( { fontSize: '3em' }, 1500);
      ties ++;
    }
    games ++
    $surrender.hide();
    $anotherRound.show();
    $man.hide();
    $machine.hide();
  }

  function showPlayer2 () {
    $( '.boardsContainer' ).show();
    $player2start.hide();
  }

  function openingAnimation () {
    $man.show();
    $machine.show();
    $anotherRound.hide();
    $surrender.hide();
    $player2start.hide();
    $( 'h1' ).animate( { fontSize: '7em' }, 1500);
    $psquare.animate( { backgroundColor: 'red' }, 1500);
    $csquare.animate( { backgroundColor: 'red' }, 1600);
    $plyr1.animate( { color: 'green' }, 750);
    $plyr1.animate( { fontSize: '2em' }, 1500);
    $plyr2.animate( { fontSize: '0' }, 1500);
  }

  function player1GamePlay () {
    $player1start.on('click', function () {
      setTimeout ( function() {
        $csquare.animate( { backgroundColor: 'red' }, 1500 );
      }, 4000 );
      $player1start.hide();
      $surrender.show();
      computer =  new CompuPad();
      player = new PlayersPad();
      player.newPlayersPad();
      player.playerSelectpad();
      timer = new Timer();
      timer.startTime();
      $surrender.on('click', function () {
        timer.stopTimer();
        player1time = 2;
        player2time = 1;
        showWinner();
      });
    });
  }

  function player2GamePlay () {
    $player2start.on('click', function () {
      setTimeout (function() {
        $csquare.animate({backgroundColor: 'red'}, 1500);
      }, 4000);
      $player2start.hide();
      $surrender.show();
      computer2 =  new CompuPad();
      player2 = new PlayersPad();
      player2.newPlayersPad();
      showPlayer2();
      timer2 = new Timer();
      timer2.startTime();
      $surrender.on('click', function () {
        
        timer2.stopTimer();
        player1time = 1;
        player2time = 2;
        showWinner();
      });
    });
  }

$(document).ready(function() {
  openingAnimation ();
  player1GamePlay ();
  player2GamePlay ();
});
