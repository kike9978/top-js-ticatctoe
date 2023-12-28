const Game = (function () {
  let isGameOver = false
  let turn = 1;

  // const startGame = () => {
  //   GameRenderer.deleteStartBtn()
  //   console.log("Que comience el juego")
  //   GameBoard.displayGameBoard();

  //   while (!isGameOver) {
  //     console.log("---------")
  //     console.log("Turno: ", turn)
  //     askForMove();
  //     handleResultValidation();

  //     turn >= 10 ? isGameOver = true : false;
  //     checkGameOver()
  //   }
  // }

  const checkGameOver = (currentPlayer = "") => {
    console.log("Soy el jugador: " + currentPlayer)
    let message = ""
    if (isGameOver && !(turn >= 10)) {
      // console.log({currentPlayer})
      message = `Se acabó el juego. ${currentPlayer} ganó.`
      GameRenderer.openDialog()
    }
    if (turn >= 10) {
      isGameOver = true;
      message = "Nadie ganó, sopésalo."
    }
    if (isGameOver) {
      message += " Terminó el juego"
      GameRenderer.setMessage(message);
      GameRenderer.openDialog()
    }
  }


  const getTurn = () => turn;

  function handleResultValidation() {
    let currentPlayer =
      (turn - 1) % 2 === 1 ? playerOne.getMark() : playerTwo.getMark();

    for (let i = 0; i <= 7; i++) {
      const winCondition = GameBoard.winningConditions[i]
      let a = GameBoard.getValue(winCondition[0][0], winCondition[0][1])
      let b = GameBoard.getValue(winCondition[1][0], winCondition[1][1])
      let c = GameBoard.getValue(winCondition[2][0], winCondition[2][1])

      if (a === currentPlayer && b === currentPlayer && c === currentPlayer) {
        isGameOver = true
        GameRenderer.removeEvents()
        console.log(currentPlayer)
        checkGameOver(currentPlayer);
        break
      }
    }
  }

  const makeAMove = (boardIndex) => {
    const grid = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ]

    const [x, y] = grid[boardIndex]
    if (GameBoard.getValue(x, y) !== "") {


    } else {
      if (turn % 2 === 1) {
        playerOne.markBoard(x, y)
      }
      else {
        playerTwo.markBoard(x, y)
      }
      
      turn++;
      handleResultValidation()

      if (!isGameOver) {
        console.log("aun no se acaba el juego")
        checkGameOver()
        if (!isGameOver) {
        GameBoard.displayGameBoard();
        GameRenderer.updateTurn()
        GameRenderer.updatePlayer()
        }

      }
    }
  }


  const reset = () => {
    isGameOver = false;
    turn = 1;
    GameBoard.resetBoard();
    GameRenderer.resetUI()
  }

  return {
    // startGame,
    checkGameOver,
    getTurn,
    reset,
    handleResultValidation,
    makeAMove
  }
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
    // gameBoard.forEach(row => console.log(row))
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
  const currentPlayer = document.querySelector(`[data-game="current-player"]`)
  const dialog = document.querySelector("dialog")
  const messageText = document.querySelector(`[data-game="message"]`)

  turn.innerText = `Turn: ${Game.getTurn()}`;
  currentPlayer.innerText = `Player: ${Game.getTurn() % 2 === 1 ? playerOne.getMark() : playerTwo.getMark()}`

  function addBoardEvents() {
    gameBoardContainer.addEventListener("click", handleSpaceClick)
  }
  const gameBoardContainer = document.querySelector(`[data-game="board"]`)
  addBoardEvents()

  const startGameBtn = document.querySelector(`[data-btn="start-game"]`)
  // startGameBtn.addEventListener("click", Game.startGame);

  const resetBtn = document.querySelector(`[data-btn="reset-game"]`)
  resetBtn.addEventListener("click", Game.reset)
  // resetBtn.setAttribute("data-btn", "reset-btn")
  // resetBtn.setAttribute("class", "bg-pink-600 hover:bg-pink-700 text-white border rounded-md px-2 border-none")
  // resetBtn.innerText = "Volver a jugar"

  const setMessage = (message) => {
    messageText.innerText = message;
  }

  const openDialog = () => {
    dialog.showModal()
  }

  const deleteStartBtn = () => {
    startGameBtn.remove()
  }

  const updateTurn = () => {
    turn.innerText = `Turn: ${Game.getTurn()}`
  }

  const updatePlayer = () => {
    currentPlayer.innerText = `Player: ${Game.getTurn() % 2 === 1 ? playerOne.getMark() : playerTwo.getMark()}`
  }

  const removeEvents = () => {
    gameBoardContainer.removeEventListener("click", handleSpaceClick)
  }

  function resetBoard() {
    Array.from(gameBoardContainer.children).forEach((space, index) => {
      gameBoardContainer.children[index].innerText = ""
    })
  }
  const resetUI = () => {
    dialog.close()
    addBoardEvents()
    resetBoard()
    turn.innerText = `Turn: 1`;
    currentPlayer.innerText = `Player: ${playerOne.getMark()}`;
  }

  function handleSpaceClick(event) {
    const space = event.target;

    if (!space.getAttribute("data-game").startsWith("space")) {
      return;
    }

    const index = Array.from(space.parentNode.children).indexOf(space)
    Game.makeAMove(index)
    space.innerText = GameBoard.getBoard().flat()[index];
  }

  return {
    openDialog,
    deleteStartBtn,
    updatePlayer,
    updateTurn,
    removeEvents,
    resetUI,
    setMessage,
  }
})();