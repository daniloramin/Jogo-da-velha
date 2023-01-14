let newWinner = false;
let playerTurn = 0;
const simbols = ["X", "O"];
let positions = ["", "", "", "", "", "", "", "", ""];
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const allSquares = document.getElementsByClassName("square");
const squares = [...allSquares];

const click = ({ target }) => {
  const position = target.id;

  if (positions[position] != "" || newWinner == true) {
    return;
  }

  target.innerHTML = simbols[playerTurn];
  target.style.animation = "";
  target.style.animation = "clickSquare 500ms";

  positions[position] = simbols[playerTurn];

  newWinner = winner(simbols[playerTurn], playerTurn);

  if (!positions.some((p) => p == "")) {
    const x = document.getElementById("resultX");
    const o = document.getElementById("resultO");
    x.innerHTML = "Empate";
    o.innerHTML = "Empate";
  }

  playerTurn = playerTurn == 0 ? 1 : 0;

  changePlayerFocus(playerTurn);
};

const winner = (simbol, player) => {
  const x = document.getElementById("resultX");
  const o = document.getElementById("resultO");

  for (let win of wins) {
    if (
      positions[win[0]] == simbol &&
      positions[win[1]] == simbol &&
      positions[win[2]] == simbol
    ) {
      if (player == 0) {
        x.innerHTML = "Vitória";
        o.innerHTML = "";
      } else {
        x.innerHTML = "";
        o.innerHTML = "Vitória";
      }

      return true;
    }
  }
};

const changePlayerFocus = (player) => {
  const x = document.getElementById("x");
  const o = document.getElementById("o");

  if (player == 0) {
    x.className = "turn";
    o.className = "";
  } else {
    x.className = "";
    o.className = "turn";
  }
};

squares.forEach((square) => {
  square.addEventListener("click", click);
});

const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
  const x = document.getElementById("x");
  const o = document.getElementById("o");
  const resultX = document.getElementById("resultX");
  const resultO = document.getElementById("resultO");

  x.className = "turn";
  o.className = "";
  resultX.innerHTML = "";
  resultO.innerHTML = "";

  newWinner = false;
  playerTurn = 0;
  positions = ["", "", "", "", "", "", "", "", ""];

  squares.forEach((square) => {
    square.style.animation = "";
    square.innerHTML = "";
  });
});
