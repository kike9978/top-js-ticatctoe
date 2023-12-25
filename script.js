const Game = (function () {
  let isGameOver = false
  let turn = 1;

  const startGame = () => {
    GameBoard.displayGameBoard();
    // playerOne.setMark(prompt("Escribe la marca del primer jugador"))
    // playerTwo.setMark(prompt("Escribe la marca del segundo jugador"))
    askForMove();
  }

  const checkGameOver = () => {
    if (isGameOver) {
      console.log("Se acabó el juego")
    }
    else {
      console.log("No se ha acabado")
    }
  }

  const setGameOver = () => {
    isGameOver = true;
  }

  const getTurn = () => turn;

  const askForMove = () => {
    const x = prompt(`Turno: ${turn}, Turno de jugador 1, movimiento x`)
    const y = prompt(`Turno: ${turn}, Turno de jugador 1, movimiento y`)
    console.log("---------")
    playerOne.markBoard(x,y)
    turn ++;
  }

  return { startGame, checkGameOver, setGameOver, getTurn }
})();

const DisplayControler = (function () {
  let score = 0
  const displayScore = () => score
  const addScore = () => score++;
  return { displayScore, addScore }
})();

const GameBoard = (function () {
  const gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]]
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