//Default Settings:
//Single Player Settings
var player = "X";
var computer = "O";
//Difficulty Settings
var level = 1;
let tot = 0;
var vsHuman  = 0; //To play either against computer or human
//Two human player settings
var player1 = "X";  
var player2 = "O";
var move =1;
var turn = 1    //To know which player's turn it is 
var selected;
let board_full = false;
let order=3;  //board size
var heuristic= 0; //Deafault algorithm Minimax
var optionsRendered=0;
var difficultyRendered=0;

//Loading Reinforcement Learning data
var rein_data_1 = move1();
var rein_data_2 = move2();
var rein_data_3 = move3();
var rein_data_4 = move4();


//the boards, in an array form
let threeboard = ["", "", "", "", "", "", "", "", ""];
let fourboard = ["", "", "", "","", "", "", "","", "", "", "","", "", "", ""];
//contains the board class
const board_container = document.querySelector("#board");
//contains the winner section
const winner_statement = document.getElementById("winner");
//contains the divs for the settings, appropriate options will show up when necessary
const player_container = document.querySelector("#player");
player_container.innerHTML="";
const difficulty_container = document.querySelector("#difficulty");
difficulty_container.innerHTML="";
const heuristics_container = document.querySelector("#heuristics");
heuristics_container.innerHTML="";
//checks if board is complete
check_board_complete = () => {
  let flag = true;
  if(order==3){
  threeboard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
}
  else if(order==4){
    fourboard.forEach(element => {
      if (element != player && element != computer){
        flag = false;
      }

    });
  }
  board_full = flag;
};
//checks if any n elements are the same
const check_line_3 = (a, b, c) => {
  return (
    threeboard[a] == threeboard[b] &&
    threeboard[b] == threeboard[c] &&
    (threeboard[a] == player || threeboard[a] == computer)
  );
};
const check_line_4 = (a, b, c, d) => {
  return (
    fourboard[a] == fourboard[b] &&
    fourboard[b] == fourboard[c] &&
    fourboard[c] == fourboard[d] &&
    (fourboard[a] == player || fourboard[a] == computer)
  );
};
//checks for winner of 3x3 and returns the winner
const check_match_3 = () => {
    //checking for complete rows
  for (i = 0; i < 9; i += 3) {
    if (check_line_3(i, i + 1, i + 2)) {
      document.querySelector(`#c${i}`).classList.add("win");
      document.querySelector(`#c${i + 1}`).classList.add("win");
      document.querySelector(`#c${i + 2}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking for complete columns
  for (i = 0; i < 3; i++) {
    if (check_line_3(i, i + 3, i + 6)) {
      document.querySelector(`#c${i}`).classList.add("win");
      document.querySelector(`#c${i + 3}`).classList.add("win");
      document.querySelector(`#c${i + 6}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking left diagonal
  if (check_line_3(0,4,8)) {
    document.querySelector("#c0").classList.add("win");
    document.querySelector("#c4").classList.add("win");
    document.querySelector("#c8").classList.add("win");
    return threeboard[0];
  }
  //checking right diagonal
  if (check_line_3(2, 4, 6)) {
    document.querySelector("#c2").classList.add("win");
    document.querySelector("#c4").classList.add("win");
    document.querySelector("#c6").classList.add("win");
    return threeboard[2];
  }
  //returns nothing in case no winner
  return "";
};
//checks for winner in 4x4 and returns winner
const check_match_4 = () => {
  //checking for complete rows
for (i = 0; i < 16; i += 4) {
  if (check_line_4(i, i + 1, i + 2, i + 3)) {
    document.querySelector(`#b${i}`).classList.add("win");
    document.querySelector(`#b${i + 1}`).classList.add("win");
    document.querySelector(`#b${i + 2}`).classList.add("win");
    document.querySelector(`#b${i + 3}`).classList.add("win");
    return fourboard[i];
  }
}
//checking for complete columns
for (i = 0; i < 4; i++) {
  if (check_line_4(i, i + 4, i + 8, i + 12)) {
    document.querySelector(`#b${i}`).classList.add("win");
    document.querySelector(`#b${i + 4}`).classList.add("win");
    document.querySelector(`#b${i + 8}`).classList.add("win");
    document.querySelector(`#b${i + 12}`).classList.add("win");
    return fourboard[i];
  }
}
//checking left diagonal
if (check_line_4(0,5,10,15)) {
  document.querySelector("#b0").classList.add("win");
  document.querySelector("#b5").classList.add("win");
  document.querySelector("#b10").classList.add("win");
  document.querySelector("#b15").classList.add("win");
  return fourboard[0];
}
//checking right diagonal
if (check_line_4(3, 6, 9, 12)) {
  document.querySelector("#b3").classList.add("win");
  document.querySelector("#b6").classList.add("win");
  document.querySelector("#b9").classList.add("win");
  document.querySelector("#b12").classList.add("win");
  return fourboard[3];
}
//returns nothing in case no winner
return "";
};
//displays winner on screen
const display_winner = () => {
  var res;
  if(order==3)
  res = check_match_3();
  else if (order==4)
  res = check_match_4();
  if(vsHuman==0)
 {
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
}
else {
    if (res == player) {
      winner.innerText = "Player 1 win!";
      winner.classList.add("playerWin");
      board_full = true
    } else if (res == computer) {
      winner.innerText = "Player 2 win!";
      winner.classList.add("computerWin");
      board_full = true
    } else if (board_full) {
      winner.innerText = "Draw!";
      winner.classList.add("draw");
    }
}
};
// render board
const render_board_3 = () => {
  order=3;
  document.querySelector('#threeboard').classList.add("select");
  document.querySelector('#fourboard').classList.remove("select");
  document.querySelector('#board').classList.add("three");
  document.querySelector('#board').classList.remove("four");
  board_container.innerHTML = ""
  threeboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="c${i}" class="block" onclick="addPlayerMove3(${i})">${threeboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#c${i}`).classList.add("occupied");
    }
  });
};
const render_board_4 = () => {
  order=4;
  document.querySelector('#fourboard').classList.add("select");
  document.querySelector('#threeboard').classList.remove("select");
  document.querySelector('#board').classList.add("four");
  document.querySelector('#board').classList.remove("remove");
  board_container.innerHTML = ""
  fourboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="b${i}" class="block" onclick="addPlayerMove4(${i})">${fourboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#b${i}`).classList.add("occupied");
    }
  });
};
//first move by computer
const firstComputerMove_3 = () => {
    if(order==3){
    player = "O";
    computer = "X";
    document.querySelector('#firstmove').classList.remove("select");
    document.querySelector('#secondmove').classList.add("select");
    oneHumanPlayer();
    reset_board();
    selected = Math.floor(Math.random() * 9);
    threeboard[selected] = computer;
    //add here
    if(heuristic==1){
      computer_board = 1<<selected;
      depth+=1;
    }
    game_loop_3();
    }
    else {
        player = "O";
        computer = "X";
        document.querySelector('#firstmove').classList.remove("select");
        document.querySelector('#secondmove').classList.add("select");
        oneHumanPlayer();
        reset_board();
        selected = Math.floor(Math.random() * 16);
        fourboard[selected] = computer;
        if(heuristic==1){
          computer_board = 1<<selected;
          depth+=1;
        }
        game_loop_4();
        }
    };
//first move by Human
const  firstHumanMove_3 = () => {
    player = "X";
    computer = "O";
    document.querySelector('#firstmove').classList.add("select");
    document.querySelector('#secondmove').classList.remove("select");
    oneHumanPlayer();
    reset_board();

};
//vsHumans setting
const twoHumanPlayer = () => {
    vsHuman = 1;
    document.querySelector('#human').classList.add("select");
    document.querySelector('#martian').classList.remove("select");
    player_container.innerHTML="";
    heuristics_container.innerHTML="";
    difficulty_container.innerHTML="";
    difficultyRendered=0;
    optionsRendered=0;
      reset_board();
};
const oneHumanPlayer = () => {
    vsHuman = 0;
    document.querySelector('#martian').classList.add("select");
    document.querySelector('#human').classList.remove("select");
      reset_board();

};
//fills inner html on the basis of game settings
const createMoreSettings=()=>{
  if(optionsRendered==0){
    optionsRendered=1;
    heuristics_container.innerHTML+='<label>Heuristics</label></br>';
    heuristics_container.innerHTML+='<button id="algo1" onclick="chooseAlgo(0)">Minimax</button> ';
    heuristics_container.innerHTML+='<button id="algo2" onclick="chooseAlgo(1)">Killer</button> ';
    heuristics_container.innerHTML+='<button id="algo3" onclick="chooseAlgo(2)">R L</button><br/>';
    player_container.innerHTML+='<label >Choose first player</label><br/>';
    player_container.innerHTML+='<button id="firstmove" onclick="firstHumanMove_3()">Human</button> ';
    player_container.innerHTML+='<button id="secondmove" onclick="firstComputerMove_3()">Martian</button><br/>';
  }
    

}

//Heuristics
const chooseAlgo = (x) => {
  firstHumanMove_3();
  heuristic = x;

      player='X';
      computer='O';

  if(x==0)
  {
      document.querySelector("#algo1").classList.add('select');
      document.querySelector("#algo2").classList.remove('select');
      document.querySelector("#algo3").classList.remove('select');
      if(difficultyRendered==0){
      difficultyRendered=1;
      difficulty_container.innerHTML+='<label >Choose the difficulty </label><br/>';
      difficulty_container.innerHTML+='<button id="l1" class="select" onclick="chooseLevel(1)">Easy</button> ';
      difficulty_container.innerHTML+='<button id="l2" onclick="chooseLevel(2)">Medium</button> ';
      difficulty_container.innerHTML+='<button id="l3" onclick="chooseLevel(3)">Hard</button> ';
      }
  }
  else if(x==1)
  {
      document.querySelector("#algo2").classList.add('select');
      document.querySelector("#algo1").classList.remove('select');
      document.querySelector("#algo3").classList.remove('select');
      difficulty_container.innerHTML="";
      difficultyRendered=0;

  }
  else {
      document.querySelector("#algo3").classList.add('select');
      document.querySelector("#algo2").classList.remove('select');
      document.querySelector("#algo1").classList.remove('select');
      difficulty_container.innerHTML="";
      difficultyRendered=0;
  }
  
    reset_board();
};
//game loop
const game_loop_3 = () => {
  render_board_3();
  check_board_complete();
  display_winner();
};
const game_loop_4 = () => {
  render_board_4();
  check_board_complete();
  display_winner();
};
//adding player moves
const addPlayerMove3 = e => {
  if (!board_full && threeboard[e] == "") {
    if(vsHuman==0)
    {
      //add here 
      threeboard[e] = player;
      if(heuristic == 1){
            mask = 1<<e;
            human_board = human_board | mask;
            depth+=1;
        }
        
        game_loop_3();
        addComputerMove3();
    }
    else
    {
        if(turn==1)
        {
            threeboard[e] = player1;
            turn=2;
            game_loop_3();
        }
        else {
            threeboard[e] = player2;
            turn=1;
            game_loop_3();
        }
    }
  }
};
const addPlayerMove4 = e => {
  if (!board_full && fourboard[e] == "") {
    if(vsHuman==0)
    {
        fourboard[e] = player;
        if(heuristic == 1){
          mask = 1<<e;
          human_board = human_board | mask;
          depth+=1;
      }
        game_loop_4();
        addComputerMove4();

    }
    else
    {
        if(turn==1)
        {
            fourboard[e] = player1;
            turn=2;
            game_loop_4();
        }
        else {
            fourboard[e] = player2;
            turn=1;
            game_loop_4();
        }
    }
  }
};

/*
MINIMAX
->alpha beta pruning is also implemented
->board sizes 3 and 4
*/

//Takes 1*9 array as input and returns 3*3 array
const oneDtotwoD_3 = (threeboard) => {
    var twoD = [];
  for(var i=0;i<3;i++)
  {
      twoD[i] = [threeboard[(i*3)],threeboard[(i*3)+1],threeboard[(i*3)+2]];
  }
  
  return twoD;
};
//Takes 1*16 array as input and returns 4*4 array
const oneDtotwoD_4 = (fourboard) => {
  var twoD = [];
for(var i=0;i<4;i++)
{
    twoD[i] = [fourboard[(i*4)],fourboard[(i*4)+1],fourboard[(i*4)+2],fourboard[(i*4)+3]];
}

return twoD;
};

//returns false if board is full else returns false
const isMoveLeft = (board) => {
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(board[i][j]==''){
                    return "true";
                }
            }
        }
        return "false";
    };

const isMoveLeft_4 = (board) => {
      for(var i=0;i<4;i++)
      {
          for(var j=0;j<4;j++)
          {
              if(board[i][j]==''){
                  return "true";
              }
          }
      }
      return "false";
  };
//returns 0 if game is not terminated or if it is a draw
const checkGameOver = (board,depth) => {
        for(var i=0;i<3;i++)
        {
                if(board[i][0]==board[i][1] && board[i][0]==board[i][2])
                {
                    if(board[i][0]==computer)
                        return 1000-depth;
                    if(board[i][0]==player)
                        return -1000+depth;
                }
        }
        for(var i=0;i<3;i++)
        {
                if(board[0][i]==board[1][i] && board[0][i]==board[2][i])
                {
                    if(board[0][i]==computer)
                        return 1000-depth;
                    if(board[0][i]==player)
                        return -1000+depth;
                }
        }
        if(board[0][0]==board[1][1] && board[0][0]==board[2][2])
        {
            if(board[0][0]==computer)
                return 1000-depth;
            if(board[0][0]==player)
                return -1000+depth;
        }
        if(board[2][0]==board[1][1] && board[2][0]==board[0][2])
        {
            if(board[0][2]==computer)
                return 1000-depth;
            if(board[0][2]==player)
                return -1000+depth;
        }
        return 0;
    };

const checkGameOver_4 = (board,depth) => {
      for(var i=0;i<4;i++)
      {
              if(board[i][0]==board[i][1] && board[i][0]==board[i][2] && board[i][0]==board[i][3])
              {
                  if(board[i][0]==computer)
                      return 10000-depth;
                  if(board[i][0]==player)
                      return -10000+depth;
              }
      }
      for(var i=0;i<4;i++)
      {
              if(board[0][i]==board[1][i] && board[0][i]==board[2][i] && board[0][i]==board[3][i])
              {
                  if(board[0][i]==computer)
                      return 10000-depth;
                  if(board[0][i]==player)
                      return -10000+depth;
              }
      }
      if(board[0][0]==board[1][1] && board[0][0]==board[2][2] && board[0][0]==board[3][3] )
      {
          if(board[0][0]==computer)
              return 10000-depth;
          if(board[0][0]==player)
              return -10000+depth;
      }
      if(board[3][0]==board[2][1] && board[3][0]==board[1][2] && board[3][0]==board[0][3] )
      {
          if(board[0][3]==computer)
              return 10000-depth;
          if(board[0][3]==player)
              return -10000+depth;
      }
      return 0;
  };
//returns a value indicating how favourable a state is
const evaluate = (board,depth) => {
        var p= [];
        var o= [];
        for(var i=0;i<3;i++)
        {
            p[i]=0;
            for(var j=0;j<3;j++)
            {
                if(board[i][j]==player)
                    p[i]+=1;
                if(board[i][j]==computer)
                    o[i]+=1;
            }
        }
        for(var j=0;j<3;j++)
        {
            p[j+3]=0;
            for(var i=0;i<3;i++)
            {
                if(board[i][j]==player)
                    p[j+3]+=1;
                if(board[i][j]==computer)
                    o[j+3]+=1;
            }
        }
        p[6]=0;
        o[6]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][i]==player)
                p[6]+=1;
            if(board[i][i]==computer)
                o[6]+=1;
        }
        p[7]=0;
        o[7]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][2-i]==player)
                p[7]+=1;
            if(board[i][2-i]==computer)
                o[7]+=1;
        }
        for(var i=0;i<8;i++)
        {
            if(p[i]==2 && o[i]==0)
                return 100-depth;
            if(o[i]==2 && p[i]==0)
                return -100+depth;
        }
        for(var i=0;i<8;i++)
        {
            if(p[i]==1 && o[i]==0)
                return 10-depth;
            if(o[i]==1 && p[i]==0)
                return -10+depth;
        }
        return 0;
    };

const evaluate_4 = (board,depth) => {
      var p= [];
      var o= [];
      for(var i=0;i<4;i++)
      {
          p[i]=0;
          o[i]=0;
          for(var j=0;j<4;j++)
          {
              if(board[i][j]==player)
                  p[i]+=1;
              if(board[i][j]==computer)
                  o[i]+=1;
          }
      }
      for(var j=0;j<4;j++)
      {
          p[j+4]=0;
          o[j+4]=0;
          for(var i=0;i<4;i++)
          {
              if(board[i][j]==player)
                  p[j+4]+=1;
              if(board[i][j]==computer)
                  o[j+4]+=1;
          }
      }
      p[8]=0;
      o[8]=0;
      for(var i=0;i<4;i++)
      {
          if(board[i][i]==player)
              p[8]+=1;
          if(board[i][i]==computer)
              o[8]+=1;
      }
      p[9]=0;
      o[9]=0;
      for(var i=0;i<4;i++)
      {
          if(board[i][3-i]==player)
              p[9]+=1;
          if(board[i][3-i]==computer)
              o[9]+=1;
      }
      for(var i=0;i<10;i++)
      {
          if(p[i]==3 && o[i]==0)
              return 1000-depth;
          if(o[i]==3 && p[i]==0)
              return -1000+depth;
      }
      for(var i=0;i<10;i++)
      {
          if(p[i]==2 && o[i]==0)
              return 100-depth;
          if(o[i]==2 && p[i]==0)
              return -100+depth;
      }
      for(var i=0;i<10;i++)
      {
          if(p[i]==1 && o[i]==0)
              return 10-depth;
          if(o[i]==1 && p[i]==0)
              return -10+depth;
      }
      return 0;
  };
//minimax function with alpha beta pruning
const minimax = (board,isMax,depth,maxDepth,alpha,beta) => {
        tot+=1;
        var score = checkGameOver(board,depth);
        if(score!=0)
            return [score,1];
        if(isMoveLeft(board)=="false")
            return [0,0];
      if(depth<=maxDepth){
        if(isMax=="true")
        {
            var bestOpt = 0;
            var allOpt = []
            var best= -1000;
            var val;
            var br =0;
            for(var i=0;i<3;i++)
            {
                for(var j=0;j<3;j++)
                {
                    if (board[i][j]=='')
                    {
                        board[i][j]=computer;
                        val = minimax(board,"false",depth+1,maxDepth,alpha,beta);
                        board[i][j]='';
                        best = Math.max(best,val[0]);
                        alpha = Math.max(alpha,best);
                        allOpt.push(val);
                        if(beta<=alpha)
                        {
                            br=1;
                            break;
                        }
                    }
                }
                if(br==1)
                    break;
            }
            for(var i=0;i<allOpt.length;i++)
            {
                if(allOpt[i][0]==best)
                    bestOpt+=1;
            }
            return [best,bestOpt];
        }
        else
        {
            var best= 1000;
            var val;
            var allOpt =[];
            var bestOpt =0;
            var br=0;
            for(var i=0;i<3;i++)
            {
                for(var j=0;j<3;j++)
                {
                    if (board[i][j]=='')
                    {
                        board[i][j]=player;
                        val = minimax(board,"true",depth+1,maxDepth,alpha,beta);
                        board[i][j]='';
                        best = Math.min(best,val[0]);
                        beta =  Math.min(best,beta);
                        allOpt.push(val);
                        if(beta<=alpha)
                        {
                            br=1;
                            break;
                        }
                    }
                }
                if(br==1)
                    break;
            }
            for(let i=0;i<allOpt.length;i++)
            {
                if(allOpt[i][0]==best)
                    bestOpt+=1;
            }
            return [best,bestOpt];
        }
    }
    else {
        ans = evaluate(board,depth);
        return [ans,0];
    }
};

const minimax_4 = (board,isMax,depth,maxDepth,alpha,beta) => {
  tot+=1;
  var score = checkGameOver_4(board,depth);
  if(score!=0)
      return [score,1];
  if(isMoveLeft_4(board)=="false")
      return [0,0];
if(depth<=maxDepth){
  if(isMax=="true")
  {
      var bestOpt = 0;
      var allOpt = []
      var best= -10000;
      var val;
      var br =0;
      for(var i=0;i<4;i++)
      {
          for(var j=0;j<4;j++)
          {
              if (board[i][j]=='')
              {
                  board[i][j]=computer;
                  val = minimax_4(board,"false",depth+1,maxDepth,alpha,beta);
                  board[i][j]='';
                  best = Math.max(best,val[0]);
                  alpha = Math.max(alpha,best);
                  allOpt.push(val);
                  if(beta<=alpha)
                  {
                      br=1;
                      break;
                  }
              }
          }
          if(br==1)
              break;
      }
      for(var i=0;i<allOpt.length;i++)
      {
          if(allOpt[i][0]==best)
              bestOpt+=1;
      }
      return [best,bestOpt];
  }
  else
  {
      var best= 10000;
      var val;
      var allOpt =[];
      var bestOpt =0;
      var br=0;
      for(var i=0;i<4;i++)
      {
          for(var j=0;j<4;j++)
          {
              if (board[i][j]=='')
              {
                  board[i][j]=player;
                  val = minimax_4(board,"true",depth+1,maxDepth,alpha,beta);
                  board[i][j]='';
                  best = Math.min(best,val[0]);
                  beta =  Math.min(best,beta);
                  allOpt.push(val);
                  if(beta<=alpha)
                  {
                      br=1;
                      break;
                  }
              }
          }
          if(br==1)
              break;
      }
      for(let i=0;i<allOpt.length;i++)
      {
          if(allOpt[i][0]==best)
              bestOpt+=1;
      }
      return [best,bestOpt];
  }
}
else {
  ans = evaluate_4(board,depth);
  return [ans,0];
}
};
//returns optimal move (depends on the level of difficulty)
const getBestMove = (maxDepth) =>{
        tot+=1;
        var board = oneDtotwoD_3(threeboard);
        var alpha = -10000;
        var beta = 10000;
        var allOpt =[];
        var bestOpt = [];
        var bestAns= -1000;
        var ans = [-1,-1]
        var moveAns;
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if (board[i][j]=='')
                {
                    board[i][j]=computer;
                    moveAns = minimax(board,"false",1,maxDepth,alpha,beta);
                    board[i][j]='';
                    if (moveAns[0]>bestAns)
                    {
                        bestAns=moveAns[0];
                        ans[0]=i;
                        ans[1]=j;
                    }
                    allOpt.push([moveAns,i,j]);
                }
            }
        }
        for(let i=0;i<allOpt.length;i++)
        {
            if(allOpt[i][0][0]==bestAns)
                bestOpt.push(allOpt[i]);
        }
        var loc=0;
        for(var i=1;i<bestOpt.length;i++)
        {
            if(bestOpt[i][0][1]>bestOpt[loc][0][1])
                loc=i;
        }
        var answer = [bestOpt[loc][1],bestOpt[loc][2]];
        
        var final_ans = (answer[0])*3 + answer[1];
        return final_ans;
    };


const getBestMove_4 = (maxDepth) =>{
      tot+=1;
      var board = oneDtotwoD_4(fourboard);
      var alpha = -100000;
      var beta = 100000;
      var allOpt =[];
      var bestOpt = [];
      var bestAns= -10000;
      var ans = [-1,-1]
      var moveAns;
      for(var i=0;i<4;i++)
      {
          for(var j=0;j<4;j++)
          {
              if (board[i][j]=='')
              {
                  board[i][j]=computer;
                  moveAns = minimax_4(board,"false",1,maxDepth,alpha,beta);
                  board[i][j]='';
                  if (moveAns[0]>bestAns)
                  {
                      bestAns=moveAns[0];
                      ans[0]=i;
                      ans[1]=j;
                  }
                  allOpt.push([moveAns,i,j]);
              }
          }
      }
      for(let i=0;i<allOpt.length;i++)
      {
          if(allOpt[i][0][0]==bestAns)
              bestOpt.push(allOpt[i]);
      }
      var loc=0;
      for(var i=1;i<bestOpt.length;i++)
      {
          if(bestOpt[i][0][1]>bestOpt[loc][0][1])
              loc=i;
      }
      var answer = [bestOpt[loc][1],bestOpt[loc][2]];
      
      var final_ans = (answer[0])*4 + answer[1];
      return final_ans;
  };
//Minimax with killer heuristic
const evaluate_k = (human_board, computer_board, depth) =>{
	for(var m=0;m<n;m++){
		var p=0;
		var o=0;
		var k;
		//n-m in a row
		for(var i=0;i<n;i++){
			for(var j=0;j<n;j++){
				k=((n*i)+j);
				mask=1<<k;
				if((computer_board&mask)==mask){
					p=p+1;
				}
				if((human_board&mask)==mask){
					o=o+1;
				}
			}
			if((p==(n-m))&&(o==0)){
				return (Math.pow(10,n-m))-depth;
			}
			if((o==(n-m))&&(p==0)){
				return ((-1)*(Math.pow(10,n-m)))+depth;
			}
			p=0;
			o=0;
		}
		//n-m in a column
		for(var j=0;j<n;j++){
			for(var i=0;i<n;i++){
				k=((n*i)+j);
				mask=1<<k;
				if((computer_board&mask)==mask){
					p=p+1;
				}
				if((human_board&mask)==mask){
					o=o+1;
				}
			}
			if((p==(n-m))&&(o==0)){
				return (Math.pow(10,n-m))-depth;
			}
			if((o==(n-m))&&(p==0)){
				return ((-1)*(Math.pow(10,n-m)))+depth;
			}
			p=0;
			o=0;
		}
		//n-m along diagonal
		for(var i=0;i<n;i++){
			k=n*i+i;
			mask=1<<k;
			if((computer_board&mask)==mask){
				p=p+1;
			}
			if((human_board&mask)==mask){
				o=o+1;
			}
		}
		if((p==(n-m))&&(o==0)){
			return (Math.pow(10,n-m))-depth;
		}
		if((o==(n-m))&&(p==0)){
			return ((-1)*(Math.pow(10,n-m)))+depth;
		}
		p=0;
		o=0;
		//n-m along other diagonal
		for(var i=0;i<n;i++){
			k=(n*i)+((n-1)-i);
			mask=1<<k;
			if((computer_board&mask)==mask){
				p=p+1;
			}
			if((human_board&mask)==mask){
				o=o+1;
			}
		}
		if((p==(n-m))&&(o==0)){
			return (Math.pow(10,n-m))-depth;
		}
		if((o==(n-m))&&(p==0)){
			return ((-1)*(Math.pow(10,n-m)))+depth;
		}
	}
	return 0;
};

const checkGameOver_k = (human_board,computer_board,depth)=>{
	if(n==3){
		win_conditions=[0b000000111,0b000111000,0b111000000,0b001001001,0b010010010,0b100100100,0b100010001,0b001010100]
	}
	else if(n==4){
		win_conditions=[0b0000000000001111,0b0000000011110000,0b0000111100000000,0b1111000000000000,0b0001000100010001,0b0010001000100010,0b0100010001000100,0b1000100010001000,0b1000010000100001,0b0001001001001000]
	}
	for(var i=0;i<win_conditions.length;i++){
		mask=win_conditions[i];
		if((human_board&mask)==mask){
			return ((-1)*Math.pow(10,n))+depth;
		}
		if((computer_board&mask)==mask){
			return Math.pow(10,n)-depth;
		}
	}
	return 0;
};

const isMoveLeft_k = (human_board,computer_board)=>{
	if(n==3){
		if((human_board|computer_board)==0b111111111){
			return 0;
		}
	}
	if(n==4){
		if((human_board|computer_board)==0b1111111111111111){
			return 0;
		}
	}
	return 1;
};

const minimax_k = (human_board,computer_board,isMax,alpha,beta,depth,maxDepth) =>{
	var val,best,temporary_board,move;
	var score = checkGameOver_k(human_board,computer_board,depth);
	if(score!=0){
		return score;
	}
	if((isMoveLeft_k(human_board,computer_board))==1){
		if(depth<=maxDepth){
			var allPossibleMoves=[];
			if(isMax==1){
				best=((-1)*Math.pow(10,n));
				for(var i=0;i<(n*n);i++){
					move=1<<i;
					if(((human_board&move)!=move) && ((computer_board&move)!=move)){
						if(move==killerMoves[depth-1][0]){
							efficiency[depth-1][0]+=1;
							allPossibleMoves.unshift(move);
						}
						else if(move==killerMoves[depth-1][1]){
							efficiency[depth-1][1]+=1;
							allPossibleMoves.unshift(move);
						}
						else{
							allPossibleMoves.push(move);
						}
						if((efficiency[depth-1][0]!=0) && (efficiency[depth-1][1]!=0)){
							if(efficiency[depth-1][0]<efficiency[depth-1][1]){
								var t=killerMoves[depth-1][0];
								killerMoves[depth-1][0]=killerMoves[depth-1][1];
								killerMoves[depth-1][1]=t;
								t=efficiency[depth-1][0];
								efficiency[depth-1][0]=efficiency[depth-1][1];
								efficiency[depth-1][1]=t;
							}
						}
					}
				}
				
				for(var i=0;i<allPossibleMoves.length;i++){
					move=allPossibleMoves[i];
					temporary_board = (computer_board|move);
					val=minimax_k(human_board,temporary_board,0,alpha,beta,depth+1,maxDepth);
					best=Math.max(best,val);
					alpha=Math.max(alpha,best);
					if(alpha>=beta){
						for(var j=0;j<2;j++){
							if(move==killerMoves[depth-1][i]){
								break;
							}
							if(j==1){
								if(killerMoves[depth-1][0]==0){
									killerMoves[depth-1][0]=move;
									efficiency[depth-1][0]=1;
								}
								else if(killerMoves[depth-1][1]==0){
									killerMoves[depth-1][1]=move;
									efficiency[depth-1][1]=1;
								}
								else{
									killerMoves[depth-1][1]=killerMoves[depth-1][0];
									killerMoves[depth-1][0]=move;
									efficiency[depth-1][1]=efficiency[depth-1][0];
									efficiency[depth-1][0]=1;
								}
							}
						}
						return best;
					}
				}
				return best;
			}
			else if(isMax==0){
				best=Math.pow(10,n);
				for(var i=0;i<(n*n);i++){
					move=1<<i;
					if(((human_board&move)!=move)&&((computer_board&move)!=move)){
						allPossibleMoves.push(move);
					}
				}
				
				for(var i=0;i<allPossibleMoves.length;i++){
					move=allPossibleMoves[i];
					temporary_board=(human_board|move);
					val=minimax_k(temporary_board,computer_board,1,alpha,beta,depth+1,maxDepth);
					best=Math.min(best,val);
					beta=Math.min(beta,best);
					if(alpha>=beta){
						return best;
					}
				}
				return best;
			}
		}
		else if(depth>maxDepth){
			val=evaluate_k(human_board,computer_board,depth);
			return val;
		}
	}
	return 0;
};

const getBestMove_k = (human_board,computer_board,depth,level) =>{
	var maxDepth=depth+level;
	var alpha=((-1)*Math.pow(10,n));
	var beta= Math.pow(10,n);
	var bestMaskIndex=0;
	var bestAns=((-1)*Math.pow(10,n));
	var moveMask=0;
	var moveAns=0;
	for(var i=0;i<(n*n);i++){
		moveMask=1<<i;
		if(((human_board&moveMask)==0)&&((computer_board&moveMask)==0)){
			temporary_board=(computer_board|moveMask);
			moveAns=minimax_k(human_board,temporary_board,0,alpha,beta,depth+1,maxDepth);
			if(bestAns<moveAns){
				bestAns=moveAns;
				bestMaskIndex=i;
			}
		}
	}
	return bestMaskIndex;
};

/*REINFORCEMENT LEARNING*/
//board size = 3
//returns hash value of given board state in the form of a string
const getHash_3 = () => {
    var number='';
    for (var i=0;i<9;i++)
    {
        if(threeboard[i]=='')
        {number = number + '0';}
        if (threeboard[i]=='X')
        {number = number + '1';}
        if (threeboard[i]=='O')
        {number = number + "-1";}
    }
    
    return number;
};
//returns best possible next move based on previously trained model
const rein_move_3 = () => {
    var avail_pos = ['0','0','0','0','0','0','0','0','0'];
    var s;
    var best;
    for(var i=0;i<9;i++)
    {
        if(threeboard[i]=='')
        {
            best= i;
            threeboard[i]=computer;
            ans = getHash_3();
            avail_pos[i]=ans;
            threeboard[i]='';
        }
    }
    for(var i=0;i<9;i++)
    {
        if(avail_pos[i]!='0')
        {
            try{
                if(computer=='X'){
                    
                    if(rein_data_1[avail_pos[best]]<=rein_data_1[avail_pos[i]])
                    {
                        best = i;
                    }
                }
                else {
                  
                    if(rein_data_2[avail_pos[best]]<=rein_data_2[avail_pos[i]])
                    {
                        best = i;
                    }
                }
            }
            catch{

            }
        }
    }
    return best;
};

//board size = 4
//returns hash value of given board state in the form of a string
const getHash_4 = () => {
    var number='';
    for (var i=0;i<16;i++)
    {
        if(fourboard[i]=='')
        {number = number + '0';}
        if (fourboard[i]=='X')
        {number = number + '1';}
        if (fourboard[i]=='O')
        {number = number + "-1";}
    }
    
    return number;
};
//returns best possible next move based on previously trained model
const rein_move_4 = () => {
    var avail_pos = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    var s;
    var best;
    for(var i=0;i<16;i++)
    {
        if(fourboard[i]=='')
        {
            best= i;
            fourboard[i]=computer;
            ans = getHash_4();
            avail_pos[i]=ans;
            fourboard[i]='';
        }
    }
    for(var i=0;i<16;i++)
    {
        if(avail_pos[i]!='0')
        {
            try{
               
                if(computer=='X'){
                    
                    if(rein_data_3[avail_pos[best]]<=rein_data_3[avail_pos[i]])
                    {
                        best = i;
                    }
                }
                else {
                    
                    if(rein_data_4[avail_pos[best]]<=rein_data_4[avail_pos[i]])
                    {
                        best = i;
                    }
                }
            }
            catch{

            }
        }
    }
    return best;
};

//adds move of computer when board size = 3
const addComputerMove3 = () => {
  if (!board_full) {
    if(heuristic==0){
        if(level == 1 )
        {
            selected = level_1();
        }
        if(level == 2)
        {
             selected = level_2();
        }
        if(level == 3)
        {
             selected = level_3();
        }
      threeboard[selected] = computer;
      game_loop_3();
    }
    else if (heuristic == 1){
      selected = getBestMove_k(human_board,computer_board,depth,9);
      computer_board = computer_board | (1<<selected);
      depth+=1;
      threeboard[selected] = computer;
      game_loop_3();

    }
    else{
        selected = rein_move_3();
        threeboard[selected] = computer;
        game_loop_3();
    }
  }
};

//changes needed here
//adds move of computer when board size = 4

//driver
const toReduceTime = () => {
  var filled =0; 
  for(var i=0;i<16;i++)
  {
      if(fourboard[i]!='')
      {
          filled += 1;
      }
  }
  return filled;
};
const addComputerMove4 = () => {
if (!board_full) {
  if(heuristic==0){
      if(level==1){
    do {
    selected = Math.floor(Math.random() * 16);
    } while (fourboard[selected] != "");
}
if(level==2)
{
  if(toReduceTime()>=4){
    selected = getBestMove_4(1);
  }  
  else{
    do {
      selected = Math.floor(Math.random() * 16);
      } while (fourboard[selected] != "");
  }
  // selected = getBestMove_4(1);
}
if(level==3)
{
  if(toReduceTime()>=4){
    selected = getBestMove_4(10);
  }  
  else{
    do {
      selected = Math.floor(Math.random() * 16);
      } while (fourboard[selected] != "");
  } 
  // selected = getBestMove_4(10);
}
    fourboard[selected] = computer;
    game_loop_4();
  }
  else if (heuristic == 1){
    selected = getBestMove_k(human_board,computer_board,depth,16);
    computer_board = computer_board | (1<<selected);
    depth+=1;
    fourboard[selected] = computer;
    game_loop_4();

  }
  else {
      selected = rein_move_4();
      fourboard[selected] = computer;
      game_loop_4();
  }
}
};


//Calls minimax function based on the level of difficulty
const level_1 = () => {
    do {
      selected = Math.floor(Math.random() * 9);
  } while (threeboard[selected] != "");
  return selected;
};
const level_2 = () => {
    selected = getBestMove(1);
    return selected;
};
const level_3 = () => {
        selected = getBestMove(10);
        return selected;
};

//decide difficulty
const chooseLevel = (num) =>{
    level = num;
    if(num==1){
        document.querySelector("#l2").classList.remove("select");
        document.querySelector("#l3").classList.remove("select");
        document.querySelector("#l1").classList.add("select");
    }
    if(num==2){
        document.querySelector("#l1").classList.remove("select");
        document.querySelector("#l3").classList.remove("select");
        document.querySelector("#l2").classList.add("select");
    }
    if(num==3){
        document.querySelector("#l1").classList.remove("select");
        document.querySelector("#l2").classList.remove("select");
        document.querySelector("#l3").classList.add("select");
    }
    firstHumanMove_3();
      reset_board();
    }
    


//Resets board when settings are changed
const reset_board = () => {
  if(order==3)
{
  threeboard = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  turn = 1;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  //add here
  if(heuristic==1)
  {
    n=3;
	  human_board=0;
	  computer_board=0;
	  board=[['','',''],['','',''],['','','']];
	  depth=0;
	  killerMoves=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	  efficiency = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

  }
  render_board_3();
}
  else if(order==4) {
  fourboard = ["", "", "", "","", "", "", "","", "", "", "","", "", "", ""];
  board_full = false;
  turn = 1;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  if(heuristic==1)
  {
    n=4;
	  human_board=0;
	  computer_board=0;
	  board=[['','','',''],['','','',''],['','','',''],['','','','']];
	  depth=0;
	killerMoves=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	efficiency = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

  }
  render_board_4();
  };
}

//initial render
render_board_3();
