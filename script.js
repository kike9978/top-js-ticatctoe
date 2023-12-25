const Game = (function() {
  let isGameOver = false

  const startGame = () => {
    GameBoard.displayGameBoard();
  }

  const checkGameOver = () => {
    if(isGameOver){
      console.log("Se acabó el juego")
    }
    else{
      console.log("No se ha acabado")
    }
  }

  const setGameOver = () => {
    isGameOver = true;
  }

  return { startGame, checkGameOver, setGameOver }
})();

const DisplayControler = (function() {
  let score = 0
  const displayScore = () => score
  const addScore = () => score++;
  return { displayScore, addScore }
})();

const GameBoard = (function(){
  const gameBoard = [["","",""],["","",""],["","",""]]
  const displayGameBoard = () => {
    gameBoard.forEach(row => console.log(row))
  }
  return { gameBoard, displayGameBoard }
})();


function createPlayer(mark){
  const obj = Object.create(createPlayer.proto);
  obj.mark = mark;
  return obj;
}

createPlayer.proto = {
  getMark: function () {
    return this.mark;
  },
  setMark: function(newMark) {
    this.mark = newMark
  },
  markBoard: function(x,y){
    GameBoard.gameBoard[x][y]= this.mark
    GameBoard.displayGameBoard();
  }
}


const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");

Game.startGame();