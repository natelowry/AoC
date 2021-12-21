//AOC21a
var practice = `Player 1 starting position: 4
Player 2 starting position: 8`;

var real = `Player 1 starting position: 5
Player 2 starting position: 9`;

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? real//practice
    : document.body.innerText.trim();

var player1Score = 0;
var player2Score = 0;
var player1Position = Number(input.split("\n")[0].split(":")[1]);
var player2Position = Number(input.split("\n")[1].split(":")[1]);
var currentDiceRoll = 0;
var totalRolls = 0;
while (true) {
  //player 1
  var p1Temp = 0;
  for (var i = 0; i < 3; i++) {
    totalRolls++;
    currentDiceRoll = (currentDiceRoll % 100) + 1;
    p1Temp += currentDiceRoll;
    console.log(currentDiceRoll);
  }
  player1Position = player1Position + p1Temp;
  if (player1Position % 10 == 0) {
    player1Score += 10;
  }
  if (player1Position >= 10) {
    player1Position = player1Position % 10;
  }
  player1Score += player1Position;
  console.log(`p1: ${p1Temp} space: ${player1Position} score: ${player1Score}`);

  if (player1Score >= 1000) {
    break;
  }
  //player 2
  var p2Temp = 0;
  for (var i = 0; i < 3; i++) {
    totalRolls++;
    currentDiceRoll = (currentDiceRoll % 100) + 1;
    p2Temp += currentDiceRoll;
    console.log(currentDiceRoll);
  }
  player2Position = player2Position + p2Temp;
  if (player2Position % 10 == 0) {
    player2Score += 10;
  }
  if (player2Position >= 10) {
    player2Position = player2Position % 10;
  }
  player2Score += player2Position;
  console.log(`p2: ${p2Temp} space: ${player2Position} score: ${player2Score}`);

  if (player2Score >= 1000) {
    break;
  }
}

var winnerScore = Math.max(player1Score, player2Score);
var loserScore = Math.min(player1Score, player2Score);
console.log(totalRolls);
console.log(winnerScore - loserScore);
console.log(totalRolls * loserScore);
