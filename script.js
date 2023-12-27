
const Game = (function () {
  let isGameOver = false
  let turn = 1;

  const startGame = () => {
    GameRenderer.deleteStartBtn()
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
      if (turn >= 10) {
        console.log("Nadie ganó,sopésalo")
      }
      console.log("Se acabó el juego")
      GameRenderer.displayResetBtn()
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

    console.warn({ currentPlayer })
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
      }
    }
  }

  const reset = () => {
    isGameOver = false;
    turn = 1;
    GameBoard.resetBoard();
    GameRenderer.deleteResetBtn()
    startGame()
  }

  return { startGame, checkGameOver, getTurn, reset, handleResultValidation }
})();

const GameBoard = (function () {
  let gameBoard = [
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

  const getBoard = () => gameBoard;

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

  return { displayGameBoard, getValue, winningConditions, resetBoard, setMarkOnBoard, getBoard }
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


const GameRenderer = (function () {
  const turn = document.querySelector(`[data-game="turn"]`)
  const currentPlayer = document.querySelector(`[data-game="currentPlayer"]`)
  turn.innerText += Game.getTurn();

  const spaces = document.querySelectorAll(`[data-game*="space"]`)

  const grid = [
    [0,0],
    [0,1],
    [0,2],
    [1,0],
    [1,1],
    [1,2],
    [2,0],
    [2,1],
    [2,2],
  ]

  spaces.forEach((space, index) => {
    // space.innerText = index;
    space.innerText = GameBoard.getBoard().flat()[index];
    space.addEventListener("click", () => {
      if (Game.getTurn() % 2 === 1){
        playerOne.markBoard(grid[index][0],grid[index][1])
        
      }else{
        playerTwo.markBoard(grid[index][0],grid[index][1])

    }
      space.innerText = GameBoard.getBoard().flat()[index];
      console.log(space.getAttribute("data-game"))
    })
  })

  const startGameBtn = document.querySelector(`[data-btn="start-game"]`)
  const startGameClickHandler = () => Game.startGame();

  startGameBtn.addEventListener("click", startGameClickHandler);


  const resetBtn = document.createElement("button")
  resetBtn.setAttribute("data-btn", "reset-btn")
  resetBtn.addEventListener("click", Game.reset)
  resetBtn.innerText = "Volver a jugar"

  const displayResetBtn = () => {
    document.body.appendChild(resetBtn)
  }
  const deleteResetBtn = () => {
    resetBtn.remove()
  }

  const deleteStartBtn = () => {
    startGameBtn.remove()
  }

  return { displayResetBtn, deleteResetBtn, deleteStartBtn }
})();
