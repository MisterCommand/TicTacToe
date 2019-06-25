const _cliProgress = require('cli-progress');
// X |  | X
// O |  | O
//   |  |

// Define X and O
var ai = "X";
var ai2 = "O";

// 上述的版面
//var ori_board = ["X", 1, "X", "O", 4, "O", 6, 7, 8];
// 全新的版面
var ori_board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// 檢測玩家是否贏了(->T/F)
function win(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

// 檢測遊戲的空位(->[1, 4, 6, 7, 8])
function empty(board){
    return  board.filter(s => s != "O" && s != "X");
}

function minimax(board, player) {
    var ava = empty(board);

    // 檢測遊戲是否達到完結的狀態（輸/贏/平手）
    if (win(board, turnPlayer)) {
        return {score: 10}
    } else if (win(board, turnOpp)) {
        return {score: -10}
    } else if (ava.length === 0) {
        return {score: 0}
    }

    // 如果遊戲沒有完結...
    // 所有可以走的選擇
    var moves = [];

    for (var i = 0; i < ava.length; i++) {

        // 儲存獨立的結果(->{index: ?; score; ?})
        var move = {};
        move.index = board[ava[i]];
        
        // 達成選擇(放X/O)
        board[ava[i]] = player;

        // 轉換玩家(ai->ai2/ai2->ai)
        if (player == ai) {
            var result = minimax(board, ai2, ai);
            move.score = result.score;
        } else {
            var result = minimax(board, ai, ai2);
            move.score = result.score;
        }

        // 恢復原本狀態(取消X/O)
        board[ava[i]] = move.index;

        // 把所有可能選擇放進 moves
        moves.push(move);
        //console.log(moves);
    }

    // 尋找最高分的選擇
    var bestMove;
    if (turnPlayer == ai) {
        if(player == ai) {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
                }
            }
        } else {
    
            // 尋找最低分的選擇
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    } else {
        if(player == ai2) {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
                }
            }
        } else {
    
            // 尋找最低分的選擇
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    }
    return moves[bestMove];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var turnPlayer = "";
var turnOpp = "";

// X
function play_X() {
    turnPlayer = ai;
    turnOpp = ai2;
    var p = 60; // 做出正確選擇的機率
    if(Math.random()*100 <= p) {
        var bestSpot = minimax(ori_board, ai, ai2); 
        ori_board[bestSpot.index] = "X";
        //console.log("index: " + bestSpot.index);
    }
    else {
        let ava = empty(ori_board);
        let i = getRandomInt(ava.length);
        let spot = ava[i];
        ori_board[spot] = "X";
    }
}


function play_O() {
    turnPlayer = ai2;
    turnOpp = ai;
    var p = 60; // 做出正確選擇的機率
    if(Math.random()*100 <= p) {
        var bestSpot = minimax(ori_board, ai2, ai); 
        ori_board[bestSpot.index] = "O";
        //console.log("index: " + bestSpot.index);
    }
    else {
        let ava = empty(ori_board);
        let i = getRandomInt(ava.length);
        let spot = ava[i];
        ori_board[spot] = "O";
    }
}

//function play_O() {
//    let ava = empty(ori_board);
//    let i = getRandomInt(ava.length);
//    let spot = ava[i];
//    ori_board[spot] = "O";
//}

// 初始版面
function startBoard(type, player) {
    let sboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let random = [];
    let spot;
    if (type == "centre") {
        sboard = [0, 1, 2, 3, player, 5, 6, 7, 8];
        return sboard;
    } else if (type == "side") {
        random = [1, 3, 5, 7];
        spot = random[getRandomInt(3)];
        sboard[spot] = player;
        return sboard;
    } else if (type == "corner") {
        random = [0, 2, 6, 8];
        spot = random[getRandomInt(3)];
        sboard[spot] = player;
        return sboard;
    }  else if (type == "random") {
        random = sboard;
        spot = random[getRandomInt(8)];
        sboard[spot] = player;
        return sboard;
    } else {
        console.log("Error(b1)")
        process.exit();
    }
}

function secondBoard(board, type, player) {
    let ava = empty(board);
    let random = [];
    let spot;
    if (type == "centre") {
        board[4] = player;
        return board;
    } else if (type == "side") {
        random = ava;
        spot = random[getRandomInt(8)];
        while (spot != 1 && spot != 3 && spot != 5 && spot != 7) {
            spot = random[getRandomInt(8)];
        }
        board[spot] = player;
        return board;
    } else if (type == "corner") {
        random = ava;
        spot = random[getRandomInt(8)];
        while (spot != 0 && spot != 2 && spot != 6 && spot != 8) {
            spot = random[getRandomInt(8)];
        }
        board[spot] = player;
        return board;
    }  else if (type == "random") {
        random = ava;
        spot = random[getRandomInt(8)];
        board[spot] = player;
        return board;
    } else {
        console.log("Error(b2)")
        process.exit();
    }
}

// -------------------------------------------------------------------------------------------------------

exports.game = function game(no, section, run, type1, type2) {
    var result = "";
    var times; // 重複次數
    var rounds; // 遊戲局數
    var aiWin = 0;
    var ai2Win = 0;
    var tie= 0;
    const bar = new _cliProgress.Bar({clearOnComplete:true}, _cliProgress.Presets.shades_classic);
    bar.start(run, 0);
    for (times=0; times<run; times++) {
        // 選擇測試類型
        if (section == 1) {
            ori_board = startBoard(type1, ai);
            //console.log(ori_board);
        } else if (section == 2) {
            ori_board = startBoard(type1, ai2);
            //console.log(ori_board);
            ori_board = secondBoard(ori_board, type2, ai);
            //console.log(ori_board);
        } else {
            //console.log("Error(0)")
            process.exit();
        }
        // 進行測試
        while (empty(ori_board).length != 0 && !win(ori_board, ai) && !win(ori_board, ai2)) {
            play_O(rounds);
            //console.log(ori_board);
            if (empty(ori_board).length != 0 && !win(ori_board, ai) && !win(ori_board, ai2)) {
                play_X();
                //console.log(ori_board);
            }
        }
        if (win(ori_board, ai)) {
            //console.log("AI won");
            aiWin+= 1;
        } else if (win(ori_board, ai2)) {
            //console.log("AI2 won");
            ai2Win += 1;
        } else if (empty(ori_board).length === 0) {
            //console.log("tie");
            tie +=1;
        }
        bar.update(times+1);
    }
    result = "Test Number: " + no +  " Ai Win: " + aiWin + " Ai2 Win: " + ai2Win + " Tie: " + tie + "\n";
    return result;
}

//game(1, 1, "random");
//game(2, 1, "centre");
//game(3, 1, "side");
//game(4, 1, "corner");
//game(5, 2, "random", "random");
//game(6, 2, "centre", "side");
//game(7, 2, "centre", "corner");
//game(8, 2, "side", "centre");
//game(9, 2, "side", "side");
//game(10, 2, "side", "corner");
//game(11, 2, "corner", "centre");
//game(12, 2, "corner", "side");
//game(13, 2, "corner", "corner");
//console.log(result);


