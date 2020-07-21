//Aishwwarya, please make changes here
var player = "X";
var computer = "O";
var level = 1;
let tot = 0;
var vsHuman  = 0;
var player1 = "X";
var player2 = "O";
var move =1;
var selected;
let board_full = false;
//the boards, in an array form
let threeboard = ["", "", "", "", "", "", "", "", ""];
let fourboard = ["", "", "", "","", "", "", "","", "", "", "","", "", "", ""];
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
    (threeboard[a] == player || threeboard[a] == computer)
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

const check_for_winner = () => {
  let res = check_match_3()
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


const render_board_3 = () => {
  board_container.innerHTML = ""
  threeboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="c${i}" class="block" onclick="addPlayerMove3(${i})">${threeboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#c${i}`).classList.add("occupied");
    }
  });
};
const render_board_4 = () => {
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
    player = "O";
    computer = "X";
    reset_board_3();
    selected = Math.floor(Math.random() * 9);
    threeboard[selected] = computer;
    game_loop_3();
};
//first move by Human
const  firstHumanMove_3 = () => {
    player = "X";
    computer = "O";
    reset_board_3();
};
//vsHumans setting
const twoHumanPlayer = () => {
    vsHuman = 1;
    document.querySelector('#human').classList.add("select");
    document.querySelector('#martian').classList.remove("select");
    reset_board_3();
};
const oneHumanPlayer = () => {
    vsHuman = 0;
    document.querySelector('#martian').classList.add("select");
    document.querySelector('#human').classList.remove("select");
    reset_board_3();
};
//
const game_loop_3 = () => {
  render_board_3();
  check_board_complete();
  check_for_winner();
};
const game_loop_4 = () => {
  render_board_4();
  check_board_complete();
  check_for_winner();
};
//adding player moves
const addPlayerMove3 = e => {
  if (!board_full && threeboard[e] == "") {
    if(vsHuman==0)
    {
        threeboard[e] = player;
        game_loop_3();
        addComputerMove3();
    }
    else
    {
        if(move==1)
        {
            threeboard[e] = player1;
            move=2;
            game_loop_3();
        }
        else {
            threeboard[e] = player2;
            move=1;
            game_loop_3();
        }
    }
  }
};
const addPlayerMove4 = e => {
  if (!board_full && fourboard[e] == "") {
    fourboard[e] = player;
    game_loop_4();
    addComputerMove4();
  }
};
//Aishwwarya, make changes here, this is entirely random as of now
const oneDtotwoD_3 = (threeboard) => {
    var twoD = [];
  for(var i=0;i<3;i++)
  {
      twoD[i] = [threeboard[(i*3)],threeboard[(i*3)+1],threeboard[(i*3)+2]];
  }
  console.log(twoD);
  return twoD;
};

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

const checkGameOver = (board,depth) => {
//console.log(depth);
        for(var i=0;i<3;i++)
        {
                if(board[i][0]==board[i][1] && board[i][0]==board[i][2])
                {
                    if(board[i][0]==computer)
                    {
                        return 1000-depth;
                    }
                    if(board[i][0]==player)
                    {
                        return -1000+depth;
                    }
                }
        }
        for(var i=0;i<3;i++)
        {
                if(board[0][i]==board[1][i] && board[0][i]==board[2][i])
                {
                    if(board[0][i]==computer)
                    {
                        return 1000-depth;
                    }
                    if(board[0][i]==player)
                    {
                        return -1000+depth;
                    }
                }
        }
        if(board[0][0]==board[1][1] && board[0][0]==board[2][2])
        {
            if(board[0][0]==computer)
            {
                return 1000-depth;
            }
            if(board[0][0]==player)
            {
                return -1000+depth;
            }
        }
        if(board[2][0]==board[1][1] && board[2][0]==board[0][2])
        {
            if(board[0][2]==computer)
            {
                return 1000-depth;
            }
            if(board[0][2]==player)
            {
                return -1000+depth;
            }
        }
        return 0;
    };

const evaluate = (board,depth) => {
        var p= [];
        var o= [];
        for(var i=0;i<3;i++)
        {
            p[i]=0;
            for(var j=0;j<3;j++)
            {
                if(board[i][j]==player)
                {
                    p[i]+=1;
                }
                if(board[i][j]==computer)
                {
                    o[i]+=1;
                }
            }
        }
        for(var j=0;j<3;j++)
        {
            p[j+3]=0;
            for(var i=0;i<3;i++)
            {
                if(board[i][j]==player)
                {
                    p[j+3]+=1;
                }
                if(board[i][j]==computer)
                {
                    o[j+3]+=1;
                }
            }
        }
        p[6]=0;
        o[6]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][i]==player)
            {
                p[6]+=1;
            }
            if(board[i][i]==computer)
            {
                o[6]+=1;
            }
        }
        p[7]=0;
        o[7]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][2-i]==player)
            {
                p[7]+=1;
            }
            if(board[i][2-i]==computer)
            {
                o[7]+=1;
            }
        }
        for(var i=0;i<8;i++)
        {
            if(p[i]==2 && o[i]==0)
            {
                return 100-depth;
            }
            if(o[i]==2 && p[i]==0)
            {
                return -100+depth;
            }
        }
        for(var i=0;i<8;i++)
        {
            if(p[i]==1 && o[i]==0)
            {
                return 10-depth;
            }
            if(o[i]==1 && p[i]==0)
            {
                return -10+depth;
            }
        }
        return 0;
    };

const minimax = (board,isMax,depth,maxDepth,alpha,beta) => {
        //board[3]+=1;
        tot+=1;
        var score = checkGameOver(board,depth);
        //console.log("score at ");
        //console.log(score);
        if(score!=0)
        {
            return [score,1];
        }
        if(isMoveLeft(board)=="false")
        {
            //console.log("this is working");
            return [0,0];
        }
//        console.log(isMax);
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
                {
                    break;
                }
            }
            for(var i=0;i<allOpt.length;i++)
            {
                if(allOpt[i][0]==best)
                {
                    bestOpt+=1;
                }
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
                        //console.log(val);
                        allOpt.push(val);
                        if(beta<=alpha)
                        {
                            br=1;
                            break;
                        }
                    }
                }
                if(br==1)
                {
                    break;
                }
            }
            for(let i=0;i<allOpt.length;i++)
            {
                if(allOpt[i][0]==best)
                {
                    bestOpt+=1;
                }
            }
            return [best,bestOpt];
        }
    }
    else {

        ans = evaluate(board,depth);
        return [ans,0];
    }
};

const getBestMove = (maxDepth) =>{
        //board[3]+=1;
        tot+=1;
        var board = oneDtotwoD_3(threeboard);
        var alpha = -10000;
        var beta = 10000;
        //var maxDepth=11;
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
                    //console.log(moveAns);
                    if (moveAns[0]>bestAns)
                    {
                        bestAns=moveAns[0];
                        ans[0]=i;
                        ans[1]=j;
                        //console.log(moveAns);
                    }
                    allOpt.push([moveAns,i,j]);
                    //console.log(moveAns);
                }
            }
        }
        for(let i=0;i<allOpt.length;i++)
        {
            if(allOpt[i][0][0]==bestAns)
            {
                bestOpt.push(allOpt[i]);
            }
        }
        var loc=0;
        for(var i=1;i<bestOpt.length;i++)
        {
            if(bestOpt[i][0][1]>bestOpt[loc][0][1])
            {
                loc=i;
            }
        }
        //console.log(allOpt);
        //console.log(bestOpt);
        var answer = [bestOpt[loc][1],bestOpt[loc][2]];
        //console.log(answer);
        console.log(tot);
        var final_ans = (answer[0])*3 + answer[1];
        return final_ans;
    };
const addComputerMove3 = () => {
  if (!board_full) {
    /*do {
      selected = Math.floor(Math.random() * 9);
  } while (threeboard[selected] != "");*/
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
};
const addComputerMove4 = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 16);
    } while (fourboard[selected] != "");
    fourboard[selected] = computer;
    game_loop_4();
  }
};
//Level based
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
//decide level
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
    reset_board_3();
};
//reset board
const reset_board_3 = () => {
  threeboard = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  move = 1;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board_3();
};
const reset_board_4 = () => {
  fourboard = ["", "", "", "","", "", "", "","", "", "", "","", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board_4();
};

//initial render
render_board_3();