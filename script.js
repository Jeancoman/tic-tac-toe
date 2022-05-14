const Player = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const displayController = (() => {
  const checkWinner = () => {
    let isWinner;
    const winningCombinations = [
      [gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]],
      [gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]],
      [gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]],
      [gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]],
      [gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]],
      [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]],
    ];
    winningCombinations.forEach((combination) => {
      const itContainsX = (element) => element === "X";
      const itContainsO = (element) => element === "O";
      const isMarked = (element) => element != "";
      switch (true) {
        case combination.every(itContainsX) &&
          combination.every(itContainsO) == false:
          isWinner = "X";
          break;
        case combination.every(itContainsO) &&
          combination.every(itContainsX) == false:
          isWinner = "O";
          break;
        case combination.every(itContainsX) == false &&
          combination.every(itContainsO) == false &&
          gameBoard.board.every(isMarked):
          isWinner = "Draw";
          break;
      }
    });
    return isWinner;
  };

  const displayMessage = () => {
    checkWinner()
    const message = document.querySelector(".message");
    const modal = document.querySelector(".modal");
    if (checkWinner() == "X") {
      modal.showModal()
      message.textContent = "Player one won!";

    } else if (checkWinner() == "O") {
      modal.showModal()
      message.textContent = "Player two won!";

    } else if (checkWinner() == "Draw") {
      modal.showModal()
      message.textContent = "It's a draw!";
    } 
  };

  const modal = () => {
    const modal = document.querySelector(".modal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.close();
      }
    };
  };

  const restartButton = () => {
    const button = document.querySelector("button");
    const squares = document.querySelectorAll(".square");
    const message = document.querySelector(".message")
    const board = gameBoard.board;
    button.addEventListener("click", () => {
      for (let index = 0; index < board.length; index++) {
        board[index] = "";
      }
    })
    button.addEventListener("click", () => {
      squares.forEach(square => {
        if(square.querySelector(".marker")) {
          const marker = square.querySelector(".marker");
          square.removeChild(marker);
        }
      })
    })
    button.addEventListener("click", () => {
      message.textContent = "";
    })
  }

  const addMarks = () => {
    const squares = document.querySelectorAll(".square");
    let playerTurn = "X";
    squares.forEach(function (square) {
      square.addEventListener("click", function () {
        checkWinner();
        if (
          this.querySelector(".marker") == null &&
          checkWinner() == undefined
        ) {
          const index = this.dataset.square;
          gameBoard.board[index] = playerTurn == "X" ? "X" : "O";
          const div = document.createElement("div");
          div.classList.add("marker");
          div.textContent =
            playerTurn == "X"
              ? ((playerTurn = "O"), "X")
              : ((playerTurn = "X"), "O");
          this.appendChild(div);
        } 
        square.addEventListener("click", displayMessage)
      });
    });
  };

  return { addMarks, checkWinner, modal, restartButton };
})();

const game = (() => {
  displayController.addMarks();
  displayController.modal();
  displayController.restartButton()
})();
