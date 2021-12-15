//AOC15a
var practice = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? practice
    : document.body.innerText.trim();

var grid = input.split("\n").map((line, yidx) =>
  line.split("").map((char, xidx) => ({
    x: xidx,
    y: yidx,
    cost: Number(char),
    distance: 123412341234,
    visited: false,
  }))
);
grid[0][0].distance = 0;

var gridWidth = grid.length;
var gridHeight = grid[0].length;

var currentNodeCoords = {x: 0, y: 0};

function processNodeAt(xToCheck, yToCheck, currentDistance) {
  if (xToCheck < 0 || xToCheck >= gridWidth || yToCheck < 0 || yToCheck >= gridHeight) {
    return;
  }
  var newNode = grid[yToCheck][xToCheck];
  if (!newNode.visited) {
    var tentativeDistance = currentDistance + newNode.cost;
    var newDistance = Math.min(tentativeDistance, newNode.distance);
    //console.log(`${xToCheck} ${yToCheck} setting to ${newDistance} was ${newNode.distance}`);
    grid[yToCheck][xToCheck].distance = newDistance;
  }
  return;
}

while (!grid[gridWidth - 1][gridHeight - 1].visited) {
  var currentNode = grid[currentNodeCoords.y][currentNodeCoords.x];

  if (currentNode.x > 2 || currentNode.y > 2) {
    //   break;
  }

  processNodeAt(currentNode.x - 1, currentNode.y, currentNode.distance);
  processNodeAt(currentNode.x + 1, currentNode.y, currentNode.distance);
  processNodeAt(currentNode.x, currentNode.y - 1, currentNode.distance);
  processNodeAt(currentNode.x, currentNode.y + 1, currentNode.distance);

  grid[currentNode.y][currentNode.x].visited = true;

  var smallestNodeLeft = grid
    .flatMap((x) => x)
    .filter((x) => !x.visited)
    .sort((x, y) => x.distance - y.distance)[0];

    if (smallestNodeLeft == undefined) { 
        //or wait for it to crash lol
        break;
    }

    currentNodeCoords.x = smallestNodeLeft.x;
    currentNodeCoords.y = smallestNodeLeft.y;
    //break;
}

console.log(grid[gridWidth -1][gridHeight - 1]);