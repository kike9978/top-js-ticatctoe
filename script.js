const Game = (function () {
  let isGameOver = false
  let turn = 1;

  const startGame = () => {
    console.log("Turno: ",turn)
    GameBoard.displayGameBoard();
    // playerOne.setMark(prompt("Escribe la marca del primer jugador", "O"))
    // playerTwo.setMark(prompt("Escribe la marca del segundo jugador", "X"))
    while (!isGameOver) {
      askForMove();
      turn >= 3 ? isGameOver = true : false;
      checkGameOver()
    }
  }

  const checkGameOver = () => {
    if (isGameOver) {
      console.log("Se acabó el juego")
    }
    else {
      console.log("No se ha acabado")
    }
  }


  const getTurn = () => turn;

  const askForMove = () => {

    // setTimeout(ask, "300ms")
    ask()
    function ask() {
      turn++;
      const x = prompt(`Turno: ${turn}, Turno de jugador 1, movimiento x`)
      const y = prompt(`Turno: ${turn}, Turno de jugador 1, movimiento y`)
      console.log("---------")
      console.log("Turno: ",turn)
      if (turn%2 === 1){
        playerOne.markBoard(x, y)
      }
      else{
        playerTwo.markBoard(x,y)
      }

    }
  }

  return { startGame, checkGameOver, getTurn }
})();

const DisplayControler = (function () {
  let score = 0
  const displayScore = () => score
  const addScore = () => score++;
  return { displayScore, addScore }
})();

const GameBoard = (function () {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]

  const displayGameBoard = () => {
    gameBoard.forEach(row => console.log(row))
  }
  return { gameBoard, displayGameBoard }
})();


function createPlayer(mark) {
  const obj = {};

  obj.getMark = function () {
    return mark;
  };

  obj.setMark = function (newMark) {
    mark = newMark;
  };

  obj.markBoard = function (x, y) {
    GameBoard.gameBoard[x][y] = mark;
    GameBoard.displayGameBoard();
  };

  return obj
}
const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");


Game.startGame();