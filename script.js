const Game = (function () {
  let isGameOver = false
  let turn = 1;

  const startGame = () => {
    console.log("Que comience el juego")
    GameBoard.displayGameBoard();
    // playerOne.setMark(prompt("Escribe la marca del primer jugador", "O"))
    // playerTwo.setMark(prompt("Escribe la marca del segundo jugador", "X"))
    while (!isGameOver) {
      console.log("---------")
      console.log("Turno: ", turn)
      askForMove();
      turn >= 6 ? isGameOver = true : false;
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

    const retryMessage = "Escoge un número entre el 0 y el 2"
    console.log("---------")
    console.log("turn: ", turn)

    let x = parseInt(prompt(`Turno: ${turn}, Turno de jugador 1, movimiento x`))
    while (x > 2 || x < 0 || isNaN(x)) {
      x = parseInt(prompt(retryMessage))

    }
    let y = parseInt(prompt(`Turno: ${turn}, Turno de jugador 1, movimiento y`))
    while (y > 2 || y < 0 || isNaN(y)) {
      y = parseInt(prompt(retryMessage))
    }
    if (GameBoard.getValue(x, y) !== "") {
      console.log("Valor tomado")

    } else {
      if (turn % 2 === 1) {
        playerOne.markBoard(x, y)
      }
      else {
        playerTwo.markBoard(x, y)
      }
      GameBoard.displayGameBoard();
      turn++;

    }
  }


  const reset = () => {
    isGameOver = false;
    turn = 1;
    startGame()
  }

  return { startGame, checkGameOver, getTurn, reset }
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

  const getValue = (x, y) => gameBoard[x][y];
  return { gameBoard, displayGameBoard, getValue }
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
  };

  return obj
}
const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");



const startGameBtn = document.querySelector(`[data-btn="start-game"]`)
startGameBtn.addEventListener("click", Game.startGame);