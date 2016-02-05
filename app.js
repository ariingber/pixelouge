$(document).ready(function() {
  alert("everything is ready")

  var player1sTime = 0;
  var Player2sTime = 0;
  var playersPad = [[null,null,null,null,null],[null,null,null,null,null],
  [null,null,null,null,null],[null,null,null,null,null],
  [null,null,null,null,null]]


  var $button = $('button');
  var $player = $(".player")


  function playerSelectpad() {
    $($player).on('click', function(e) {
      //click returns event with id that is captures as a string array
      // then is parsed to integers to get position of players pad to change to
      //black
      $square = $(e.toElement);
      $sqursIdStrg = $square.attr('id');
      console.log($sqursIdStrg);
      sqrsIdStrgAr = $sqursIdStrg.split('');
      console.log(sqrsIdStrgAr);
      playersPad[Number.parseInt(sqrsIdStrgAr[0])][Number.parseInt(sqrsIdStrgAr[1])] = 'black';
      console.log(playersPad);

      //changes appropriate square black
      $($square).css("background-color","black");

    })

  }





//game starts here
  $($button).on('click', function (){
    alert('this game has begun')
    $($button).hide()
    playerSelectpad()
  });



});
