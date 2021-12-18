//AOC17
var practice = `target area: x=20..30, y=-10..-5`;

var real = 'target area: x=217..240, y=-126..-69';

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? real//practice
    : document.body.innerText.trim();

var targetMinX = Number(input.split("x=")[1].split("..")[0]);
var targetMaxX = Number(input.split("..")[1].split(",")[0]);
var targetMinY = Number(input.split("y=")[1].split("..")[0]);
var targetMaxY = Number(input.split("..")[2]);

console.log(
  `target: x=${targetMinX}..${targetMaxX}, y=${targetMinY}..${targetMaxY}`
);

//console.log(hitsTarget(6,9));

var legit = 0;

var maxY = -100000;
for (var xv = 1; xv < 1000; xv++) {
  for (var yv = targetMinY; yv < 10000; yv++) {
    var currentMaxY = hitsTarget(xv, yv);
    // console.log(`${xv},${yv} ${currentMaxY}`);
    if (!isNaN(currentMaxY)) {
      legit++;
    }
    if (currentMaxY > maxY) {
      maxY = currentMaxY;
    }
  }
}

console.log(maxY);
console.log(legit);

function hitsTarget(xVelocity, yVelocity) {
  var xPos = 0;
  var yPos = 0;
  var currentXVelocity = xVelocity;
  var currentYVelocity = yVelocity;
  var maxY = -123412341234;
  //console.log(`${xPos},${yPos} (${currentXVelocity},${currentYVelocity})`);
  var count = 0;
  while (yPos >= targetMinY && count++ < 1000) {
    xPos += currentXVelocity;
    yPos += currentYVelocity;
    if (yPos > maxY) {
      maxY = yPos;
    }
    if (currentXVelocity > 0) {
      currentXVelocity -= 1;
    } else if (currentXVelocity < 0) {
      currentXVelocity += 1;
    }
    currentYVelocity -= 1;
    if (
      xPos >= targetMinX &&
      xPos <= targetMaxX &&
      yPos >= targetMinY &&
      yPos <= targetMaxY
    ) {
      // console.log(`HIT! ${xPos},${yPos}`);
      return maxY;
    }
    // console.log(`${xPos},${yPos} (${currentXVelocity},${currentYVelocity})`);
  }

  // console.log("MISS!");
  return NaN;
}
