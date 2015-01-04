$(document).ready(function(){
  createRow();
  createSnake();
  createFruit();
  move_snake();
});

//Removes the default browser scrolling when pressing the arrow keys
//mainly included to stop scrolling when using the developer tools in chrome
window.addEventListener("keydown", function(x) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(x.keyCode) > -1) {
    x.preventDefault();
  }
}, false);


//Setting initial variables and array
snakeArr = [];
head = 819;


//This function creates a 40*40 grid with corresponding ids from 0 to 1599
function createRow(){
  var col = 40;
  for(var j = 0; j < col * col; j++){
    $newcol = $('<div class="col" id="' + j + '"/>');
    $('.row').append($newcol);
  }
}

// Creates the inital snake, with a head and tail, then pushes the corresponding
// ids to the snake array. This allows the move function the use the inital snake
// array when you start the game
function createSnake(){
  $('#821').addClass('snakehead');
  $('#820').addClass('snaketail');
  $('#819').addClass('snaketail');
  snakeArr.push(819);
  snakeArr.push(820);
  snakeArr.push(821);
}

// Takes a random between 0 and 1599 this is to get a random grid ID
// the ID is then found and has the class of fruit added to it.
function createFruit(){
  var fruitID = Math.floor(Math.random()*1599);
  $(".row").find("#"+fruitID).addClass('fruit');
}



function move_snake(){
    var currentMove = '';
  //This interval makes the snake to move constantly rather than just 1 square at a time,
  //it takes the move function and passes it the currentMove variable so it will be move(left)
  // which will then use the move function below to work out what value the next grid ID will be.
  setInterval(function() {
    if (currentMove !== '') {
      move(currentMove);
    }
  }, 100);

  //This allows the script to know which arrow the user has pressed, the
  // direction is then assigned to 'currenMove' for use in the move function below
  $(document).keydown(function(e) {
      if (e.keyCode == "37" ) {       /** left arrow **/
        currentMove = 'left';
      } else if (e.keyCode == "39") { /** right arrow**/
        currentMove = 'right';
      } else if (e.keyCode == "38") { /** up arrow   **/
        currentMove = 'up';
      } else if (e.keyCode == "40") { /** down arrow **/
        currentMove = 'down';
      }
    });


  //Takes the currentMove variable from the function above, then using the switch
  // assigns the nextID variable the grid ID value that represents the move
  // so left = -1 because going left on the grid goes from 10 to 9 and so on
  function move(direction){
    var currentID = snakeArr[snakeArr.length-1];
      switch(direction){
        case 'left':
          var nextID = currentID-1;
          break;
        case'right':
          var nextID = currentID+1;
          break;
        case'up':
          var nextID = currentID-40;
          boundaries();
          break;
        case'down':
          var nextID = currentID+40;
          boundaries();
          break;
      }
  hitFruit();
  hitTail();

    //iterates through the length of the snakeArr array and removes the tail
    //so grid ID of the array with the id of 100, 101, 102 would be snakeArr[100, 101, 102].
    // snakeArr[i].removeclass removes the snaketail from that grid square this allows a snake with
    // the length of 3 to remain 3 rather than having the squares stay coloured. Without this
    // the snake just grows and grows rather than staying its correct size.
    for (var i=0;i<snakeArr.length;i++){
      $("#"+snakeArr[i]).removeClass('snaketail');
      snakeArr[i]=snakeArr[i+1];
    }

    //This adds the class of snake tail to the next grid IDs, this allows the tail
    //to follow the head, without this once the snake moves it would just be one square
    for (var p=0; p<snakeArr.length; p++){
      $("#"+snakeArr[p]).addClass('snaketail');
    }

    //This moves the snakehead across the grid. snakeArr[snakeArr.length-1] takes the snakeArr array
    //of [819, 820, 821] and sets the head to equal 821, so snakeArr[3], this means that no matter
    //how big the snake the last index of the array will be the head
    snakeArr[snakeArr.length-1] = nextID;
    $("#"+nextID).addClass('snakehead');
    $("#"+currentID).removeClass('snakehead');

      // Finds the elements with the class of snakehead and fruit, if they are
      // the same element then the fruit class is removed and a new fruit is made
      // using the createFruit function then the snakeArr is updated to include
      // the nextID which is at the end of the snake, making it one block longer
      function hitFruit(){
        head = document.getElementsByClassName('snakehead')[0].className;
        fruit = document.getElementsByClassName('fruit')[0].className;
        if(head == fruit){
          $(".fruit").removeClass('fruit');
          createFruit();
          snakeArr.unshift(nextID);
        }
      }


    //This checks to see if the snake goes out of bound at the top or bottom of the page
    //displays a Game over message and then reloads the page.
    function boundaries(){
      if (snakeArr.slice(-1)[0] > 1599 || snakeArr.slice(-1)[0] < 0){
        if(!alert('Game Over')){window.location.reload();}
      }

    }

    //This checks to see if the grid square has the class snake head and snaketail
    //if it does then it calls the game over alert
    function hitTail(){
      head = document.getElementsByClassName('snakehead')[0].className;
      tail = document.getElementsByClassName('snaketail')[1].className;
      console.log(head);
      console.log(tail);
      if(head == "col snaketail snakehead"){
        if(!alert('You hit the snake. Game Over!')){window.location.reload();}
      }
    }
  }
}
