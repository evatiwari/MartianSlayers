//Aishwwarya, please make changes here
const player = "O";
const computer = "X";

let board_full = false;
//the board, in an array form
let threeboard = ["", "", "", "", "", "", "", "", ""];
//contains the board class
const board_container = document.querySelector(".board");
//contains the winner section
const winner_statement = document.getElementById("winner");

check_board_complete = () => {
  let flag = true;
  threeboard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

//checks if any three elements are the same
const check_line = (a, b, c) => {
  return (
    threeboard[a] == threeboard[b] &&
    threeboard[b] == threeboard[c] &&
    (threeboard[a] == player || threeboard[a] == computer)
  );
};
//checks for winner and returns the winner
const check_match = () => {
    //checking for complete rows
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      document.querySelector(`#b${i}`).classList.add("win");
      document.querySelector(`#b${i + 1}`).classList.add("win");
      document.querySelector(`#b${i + 2}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking for complete columns
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      document.querySelector(`#b${i}`).classList.add("win");
      document.querySelector(`#b${i + 3}`).classList.add("win");
      document.querySelector(`#b${i + 6}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking left diagonal
  if (check_line(0,4,8)) {
    document.querySelector("#b0").classList.add("win");
    document.querySelector("#b4").classList.add("win");
    document.querySelector("#b8").classList.add("win");
    return threeboard[0];
  }
  //checking right diagonal
  if (check_line(2, 4, 6)) {
    document.querySelector("#b2").classList.add("win");
    document.querySelector("#b4").classList.add("win");
    document.querySelector("#b6").classList.add("win");
    return threeboard[2];
  }
  //returns nothing in case no winner
  return "";
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "You win!";
    winner.classList.add("playerWin");
    board_full = true
  } else if (res == computer) {
    winner.innerText = "Martians win!";
    winner.classList.add("computerWin");
    board_full = true
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};


const render_board = () => {
  board_container.innerHTML = ""
  threeboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="b${i}" class="block" onclick="addPlayerMove(${i})">${threeboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#b${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
}

const addPlayerMove = e => {
  if (!board_full && threeboard[e] == "") {
    threeboard[e] = player;
    game_loop();
    addComputerMove();
  }
};
//Aishwwarya, make changes here, this is entirely random as of now
const addComputerMove = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (threeboard[selected] != "");
    threeboard[selected] = computer;
    game_loop();
  }
};

const reset_board = () => {
  threeboard = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

//initial render
render_board();