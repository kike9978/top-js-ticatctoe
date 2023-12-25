const Game = (function() {
  const test = "hola"
  let isGameOver = false
  
  const testFunction = () => {
    console.log(test)
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

  return { test, testFunction, checkGameOver, setGameOver }
})();

const DisplayControler = (function() {
  let score = 0
  const displayScore = () => score
  const addScore = () => score++;
  return { displayScore, addScore }
})();

const GameBoard = (function(){
  const mark = "x";
  const gameBoard = [[mark,mark,mark],[mark,mark,"O"],[mark,mark,mark]]
  const displayGameBoard = () => {
    console.log(gameBoard)
  }
  return { displayGameBoard }
})();

GameBoard.displayGameBoard();