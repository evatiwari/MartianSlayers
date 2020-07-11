//Aishwwarya, please make changes here
const player = "O";
const computer = "X";

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
      document.querySelector(`#b${i}`).classList.add("win");
      document.querySelector(`#b${i + 1}`).classList.add("win");
      document.querySelector(`#b${i + 2}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking for complete columns
  for (i = 0; i < 3; i++) {
    if (check_line_3(i, i + 3, i + 6)) {
      document.querySelector(`#b${i}`).classList.add("win");
      document.querySelector(`#b${i + 3}`).classList.add("win");
      document.querySelector(`#b${i + 6}`).classList.add("win");
      return threeboard[i];
    }
  }
  //checking left diagonal
  if (check_line_3(0,4,8)) {
    document.querySelector("#b0").classList.add("win");
    document.querySelector("#b4").classList.add("win");
    document.querySelector("#b8").classList.add("win");
    return threeboard[0];
  }
  //checking right diagonal
  if (check_line_3(2, 4, 6)) {
    document.querySelector("#b2").classList.add("win");
    document.querySelector("#b4").classList.add("win");
    document.querySelector("#b6").classList.add("win");
    return threeboard[2];
  }
  //returns nothing in case no winner
  return "";
};

const check_for_winner = () => {
  let res = check_match_3()
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


const render_board_3 = () => {
  board_container.innerHTML = ""
  threeboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="c${i}" class="block" onclick="addPlayerMove3(${i})">${threeboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#b${i}`).classList.add("occupied");
    }
  });
};
const render_board_4 = () => {
  board_container.innerHTML = ""
  fourboard.forEach((e, i) => {
    board_container.innerHTML += `<div id="b${i}" class="block" onclick="addPlayerMove4(${i})">${fourboard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#c${i}`).classList.add("occupied");
    }
  });
};

const game_loop_3 = () => {
  render_board_3();
  check_board_complete();
  check_for_winner();
}
const game_loop_4 = () => {
  render_board_4();
  check_board_complete();
  check_for_winner();
}
//adding player moves
const addPlayerMove3 = e => {
  if (!board_full && threeboard[e] == "") {
    threeboard[e] = player;
    game_loop_3();
    addComputerMove3();
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
  return twoD;
};

const isMoveLeft = (board) => {
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(board[i][j]=='_'){
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
                    if(board[i][0]==this.player)
                    {
                        return 1000-depth;
                    }
                    if(board[i][0]==this.opponent)
                    {
                        return -1000+depth;
                    }
                }
        }
        for(var i=0;i<3;i++)
        {
                if(board[0][i]==board[1][i] && board[0][i]==board[2][i])
                {
                    if(board[0][i]==this.player)
                    {
                        return 1000-depth;
                    }
                    if(board[0][i]==this.opponent)
                    {
                        return -1000+depth;
                    }
                }
        }
        if(board[0][0]==board[1][1] && board[0][0]==board[2][2])
        {
            if(board[0][0]==this.player)
            {
                return 1000-depth;
            }
            if(board[0][0]==this.opponent)
            {
                return -1000+depth;
            }
        }
        if(board[2][0]==board[1][1] && board[2][0]==board[0][2])
        {
            if(board[0][2]==this.player)
            {
                return 1000-depth;
            }
            if(board[0][2]==this.opponent)
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
                if(board[i][j]==this.player)
                {
                    p[i]+=1;
                }
                if(board[i][j]==this.opponent)
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
                if(board[i][j]==this.player)
                {
                    p[j+3]+=1;
                }
                if(board[i][j]==this.opponent)
                {
                    o[j+3]+=1;
                }
            }
        }
        p[6]=0;
        o[6]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][i]==this.player)
            {
                p[6]+=1;
            }
            if(board[i][i]==this.opponent)
            {
                o[6]+=1;
            }
        }
        p[7]=0;
        o[7]=0;
        for(var i=0;i<3;i++)
        {
            if(board[i][2-i]==this.player)
            {
                p[7]+=1;
            }
            if(board[i][2-i]==this.opponent)
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
        var score = this.checkGameOver(board,depth);
        //console.log("score at ");
        //console.log(score);
        if(score!=0)
        {
            return [score,1];
        }
        if(this.isMoveLeft(board)=="false")
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
                    if (board[i][j]=='_')
                    {
                        board[i][j]=this.player;
                        val = this.minimax(board,"false",depth+1,maxDepth,alpha,beta);
                        board[i][j]='_';
                        best = Math.max(best,val[0]);
                        alpha = Math.max(alpha,best);
                        allOpt.push(val);
                        if(beta<alpha)
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
                    if (board[i][j]=='_')
                    {
                        board[i][j]=this.opponent;
                        val = this.minimax(board,"true",depth+1,maxDepth,alpha,beta);
                        board[i][j]='_';
                        best = Math.min(best,val[0]);
                        beta =  Math.min(best,beta);
                        //console.log(val);
                        allOpt.push(val);
                        if(beta<alpha)
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

        ans = this.evaluate(board,depth);
        return [ans,0];
    }
};

const getBestMove = () =>{
        //board[3]+=1;
        var board = oneDtotwoD_3(threeboard);
        var alpha = -10000;
        var beta = 10000;
        var maxDepth=3;
        allOpt =[];
        bestOpt = [];
        var bestAns= -1000;
        var ans = [-1,-1]
        var moveAns;
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if (board[i][j]=='_')
                {
                    board[i][j]=player;
                    moveAns = minimax(board,"false",1,maxDepth,alpha,beta);
                    board[i][j]='_';
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
        for(var i=0;i<bestOpt.length;i++)
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
        var final_ans = answer[0]*3 + answer[1];
        return final_ans;
    };
// Eva
// call getBestMove from addComputerMove3 func
// return value is the index in 1D array which is the solution
const addComputerMove3 = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (threeboard[selected] != "");
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
//reset board
const reset_board_3 = () => {
  threeboard = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
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
