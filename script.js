
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
      handleResultValidation();
      
      turn >= 10 ? isGameOver = true : false;
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

  function handleResultValidation() {
    let currentPlayer = (turn - 1) % 2 === 1 ? playerOne.getMark() : playerTwo.getMark()

    console.warn({currentPlayer})
    // console.log({turn})
    // console.log(turn-1)
    // console.log(turn-1 % 2 === 1)
    GameBoard.winningConditions
    for (let i = 0; i <= 7; i++) {

      const winCondition = GameBoard.winningConditions[i]

      let a = GameBoard.getValue(winCondition[0][0], winCondition[0][1])
      let b = GameBoard.getValue(winCondition[1][0], winCondition[1][1])
      let c = GameBoard.getValue(winCondition[2][0], winCondition[2][1])
      // console.log(winCondition[0])
      // console.log(winCondition[1])
      // console.log(winCondition[2])
      // console.table(winCondition)
      // console.log(i)
      // console.log("a: ", a );
      // console.log("b: ", b );
      // console.log("c: ", c );

      if (a === currentPlayer && b === currentPlayer && c === currentPlayer) {
        console.log("El jugador " + currentPlayer + " ganó, se feliz")
        isGameOver = true
        break
      }else {
        console.log("Sigue jugando")
      }
    }
  }


  const reset = () => {
    isGameOver = false;
    turn = 1;
    GameBoard.resetBoard();
    startGame()
  }

  return { startGame, checkGameOver, getTurn, reset, handleResultValidation }
})();

const GameBoard = (function () {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]

  const resetBoard = () => {
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  }
  const setMarkOnBoard = (x, y, mark) => {
    gameBoard[x][y] = mark
  }

  const displayGameBoard = () => {
    gameBoard.forEach(row => console.log(row))
  }

  const getValue = (x, y) => gameBoard[x][y];

  const winningConditions = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]],
  ]

  return { displayGameBoard, getValue, winningConditions, resetBoard, setMarkOnBoard }
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
    GameBoard.setMarkOnBoard(x, y, mark)
  };

  return obj
}
const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");


const GameRenderer = (function() {
  const init = () => {
    const startGameBtn = document.querySelector(`[data-btn="start-game"]`)
    startGameBtn.addEventListener("click", Game.startGame);
  }
  return { init }
})();


GameRenderer.init()
