var readline = require('readline-sync');
var ttt = require('./ttt.js');

var run = readline.question("Number of runs per test: ");

var result = ttt.game(1, 1, run, "random");
result += ttt.game(2, 1, run, "centre");
result += ttt.game(3, 1, run, "side");
result += ttt.game(4, 1, run, "corner");
result += ttt.game(5, 2, run, "random", "random");
result += ttt.game(6, 2, run, "centre", "side");
result += ttt.game(7, 2, run, "centre", "corner");
result += ttt.game(8, 2, run, "side", "centre");
result += ttt.game(9, 2, run, "side", "side");
result += ttt.game(10, 2, run, "side", "corner");
result += ttt.game(11, 2, run, "corner", "centre");
result += ttt.game(12, 2, run, "corner", "side");
result += ttt.game(13, 2, run, "corner", "corner");

console.log(result);