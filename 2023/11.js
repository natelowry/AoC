var input = `...........................#...................#...........................................................................................#
.................................#..................................................#.................#............#......#.................
.......................#..................#...............#............#..........................................................#.........
..........#........................................#........................#............#.....#..............#.........................#...
............................................................................................................................................
.....#..........#..............#.......#.......................................................................................#............
.................................................................#...................#..............................#.......................
............................................#..............#...............................................................#................
.........................#..................................................................#..............#................................
#..................#..............#.........................................................................................................
...................................................#.........................#........................................#....................#
.............#...........................#...............................................#..................................................
...........................#...........................#.......................................#............................................
......................#..............#..........................#...................................#..............................#........
........................................................................................................................................#...
...#................................................................................#.......................................................
.....................................................#....................#.................................#..............#................
..............................................#...................................................#..................#......................
.............#.............#...................................#.....................................................................#......
..................#......................................................................#...............#..................................
...........................................................................................................................................#
......................#.....................#......................................#.............................#.............#............
....#.............................................#.............................................#...........................................
............#....................#.............................................#............................................................
#.............................................................#.......#..................................................................#..
...........................#.............................................................#...............#..................................
......#..................................................#........................................#......................#......#...........
...................................................................#.................#...............................................#......
......................#.........#...........................................................................................................
...............................................................................................#............................#...............
........#.......#............................................................#...............................#........#....................#
............................................................................................................................................
....................................#.......................................................................................................
............................................#.........................#.....................................................................
.#...............................................#..........#....................................................................#..........
................................#.................................#......................................#........#.........................
...............#.........................#...........#.......................#.....#..............#....................#....................
............................................................................................................................................
.....#.................#......................................................................................#.............................
...............................................#...............#...........................................................................#
.................#..................#......................................#..............#..............................#..................
...........................................#........................#............................................#..........................
..#......................................................#......................................#...............................#.......#...
.......#............................................................................#.......................................................
...............................#..................#..........................................................#..............#...............
.....................#................................................#.....................................................................
...............#................................................#........................................#..................................
...................................#...................................................#....................................................
...........................................#..............................#..........................#...............#...............#......
..............................#.................................................................................#.............#.............
.........#.............#.................................#..................................................................................
......................................#..............................#.....................................#...............................#
.................................#..........................................................................................................
...............#...............................................................................#..................................#.........
..................................................................#......................................................#..................
#............................................#..........#...............#...........#.......................................................
.......................................................................................................#....................................
............................................................................................................................................
............................................................#..............#.....................#..........#.............................#.
......#.........................#..........................................................................................#................
............#...........#............................................................#......#........................#................#.....
........................................#............#..............#.......................................................................
...#........................................................................................................................................
............................................................................................................................................
................#................................#...............#......#...................................................................
............................................................................................................................................
............#.................#............#...............#................#..............................................................#
#.......................#............................................................................................................#......
..................................#.........................................................#..............................#................
......#..........................................................................................................................#..........
............................#.................#.......................#..................................#..................................
...............#....................................................................................................#.....................#.
............................................................................................................................................
.........#.............................#.........#................#........#........#.......................................................
...................#...............................................................................#........................................
.........................................................#.....................................................#............................
.#..........................................................................................#................................#..........#...
.............................................#......................#..................................................#....................
..........#..........................................................................#......................................................
...........................#......................................................................#.........................................
.................#........................................#.................................................................................
.........................................................................#..............#..........................#.................#......
.................................................................#....................................#.....................................
...#.................................#.......................................................................#..............#...............
............#.............#........................#........................................................................................
....................................................................#..........................#............................................
.............................................#....................................#.......................#.....#..............#............
.....................#............#..........................................#.............................................................#
............................................................................................................................................
..........#....................................................#........................#...................................#...............
#........................................................................#........................#.........................................
................................................#.........#..............................................#.....#......#..........#..........
..............#.....#.......................................................................................................................
..............................#.............................................#.......#........#.......#...................................#..
....................................................#.......................................................................................
.............................................................#..............................................................................
.....#........................................#........................................#.............................................#......
............................#...............................................................................................................
.......................#...............................#.................................................#..................................
...........#........................#........................................................#.............................#................
...........................................................#......#......#...........................#......................................
#......#..........#............................#.....................................#...................................................#..
..............................#................................................#...............................#............................
.....................................................................#......................................................................
........................................#...................................................................................................
.....................................................#..........#.......................................................#..................#
.......................#...................................................................#.................#................#.............
#...........................#..............#..............................#.................................................................
............................................................................................................................................
........................................................................................................#...................................
............#.....#...............#.....................#.........................................................#...................#.....
..............................................................#............................................................................#
.................................................#...................................#......#............................#..................
......................................................................................................#.....................................
...#.........................#.....................................#...........#................................................#...........
................#..............................................................................#.............#..............................
......................................#....................................#..............................................................#.
.........#...............................................#..................................................................................
.......................#........................#....................#......................#...............................#.....#.........
..........................................#............................................................................................#....
......#.....#.....................#..............................#.....................#....................................................
....................................................#.......................................................................................
.#......................................................................................................................#...................
..................#........#................#...............#.............................#.................................................
..........#........................................................................#..............#...........#.....#.......................
.....................................................................#......................................................................
...#.....................................#.....#...........................#..................#.............................................
............................................................................................................................................
.....................................#.................................................................#...................#.......#........
.......................#........................................#...................#.......................................................
.....#............#..........#..............................................................................................................
#.................................................................................................#.............#..............#............
.........#.......................#..........................................................................................................
..................................................................#........................................#................................
......................#..............................#.....#...........#....................................................................
...........................................#..........................................#...............................................#.....
...............................................................................................................#............................
.............................#..................#............................................#.......................#............#.........
................#..............................................................#.....................#......................................
.......#............................#...................#............#...................................................#..................`;

if (false) {
  input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
}

var theMap = input.split("\n").map((x) => [...x]);

for (let y = 0; y < theMap.length; y++) {
  if (theMap[y].every((s) => s === ".")) {
    theMap.splice(y, 0, [...theMap[y]]);
    y++;
  }
}

for (let x = 0; x < theMap[0].length; x++) {
  if (theMap.map((m) => m[x]).every((s) => s === ".")) {
    theMap.forEach((line) => line.splice(x, 0, "."));
    x++;
  }
}

var galaxies = [];
// var id = 0;
theMap.forEach((row, y) =>
  row.forEach((val, x) => {
    if (val === "#") {
      galaxies.push({ x, y });
      //   id++;
    }
  })
);

// console.log(galaxies);

var distances = [];
for (let i = 0; i < galaxies.length; i++) {
  const currentGalaxy = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    // if (i === j || i > j) {
    //   continue;
    // }

    var distance = Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);

    // distances.push({i, j, distance});
    distances.push(distance);
  }
}

// console.log(distances);
console.log(`answer a: ${distances.reduce((prev, curr) => prev + curr)}`);

var galaxies2 = [];
var theMap2 = input.split("\n").map((x) => [...x]);

theMap2.forEach((row, y) =>
  row.forEach((val, x) => {
    if (val === "#") {
      galaxies2.push({ x, y });
    }
  })
);

var rowsToExplode2 = [];
for (let currentY = 0; currentY < theMap2.length; currentY++) {
  if (galaxies2.filter((g) => g.y === currentY).length === 0) {
    rowsToExplode2.push(currentY);
  }
}

// console.log(rowsToExplode2);

var colsToExplode2 = [];
for (let currentX = 0; currentX < theMap2[0].length; currentX++) {
  if (galaxies2.filter((g) => g.x === currentX).length === 0) {
    colsToExplode2.push(currentX);
  }
}

// console.log(colsToExplode2);

const scaler = 999999; //999999

var distances2 = [];
for (let i = 0; i < galaxies2.length; i++) {
  const currentGalaxy = galaxies2[i];
  for (let j = i + 1; j < galaxies2.length; j++) {
    // if (i === j || i > j) {
    //   continue;
    // }

    var distance = Math.abs(galaxies2[i].x - galaxies2[j].x) + Math.abs(galaxies2[i].y - galaxies2[j].y);
    const minX = Math.min(galaxies2[i].x, galaxies2[j].x);
    const maxX = Math.max(galaxies2[i].x, galaxies2[j].x);
    const minY = Math.min(galaxies2[i].y, galaxies2[j].y);
    const maxY = Math.max(galaxies2[i].y, galaxies2[j].y);

    const colsJumped = colsToExplode2.filter((x) => x > minX && x < maxX).length;
    const rowsJumped = rowsToExplode2.filter((y) => y > minY && y < maxY).length;

    // console.log(`og dist: ${distance} jumped cols: ${colsJumped} rows: ${rowsJumped}`);

    distance += scaler * (rowsJumped + colsJumped);

    distances2.push(distance);
  }
}

console.log(`answer b: ${distances2.reduce((prev, curr) => prev + curr)}`);

//barf after this

for (let i = 0; i < rowsToExplode2.length; i++) {
  const rowToExplode = rowsToExplode2[i];
  galaxies2.forEach((g) => {
    if (g.y > rowToExplode) {
      g.y += scaler;
    }
  });

  for (let j = i + 1; j < rowsToExplode2.length; j++) {
    rowsToExplode2[j] += scaler;
  }
}

for (let i = 0; i < colsToExplode2.length; i++) {
  const colToExplode = colsToExplode2[i];
  galaxies2.forEach((g) => {
    if (g.x > colToExplode) {
      g.x += scaler;
    }
  });

  for (let j = i + 1; j < colsToExplode2.length; j++) {
    colsToExplode2[j] += scaler;
  }
}

var distances2 = [];
for (let i = 0; i < galaxies2.length; i++) {
  const currentGalaxy = galaxies2[i];
  for (let j = i + 1; j < galaxies2.length; j++) {
    // if (i === j || i > j) {
    //   continue;
    // }

    var distance = Math.abs(galaxies2[i].x - galaxies2[j].x) + Math.abs(galaxies2[i].y - galaxies2[j].y);

    //console.log(`${i} ${j} ${distance}`);
    // distances.push({i, j, distance});
    distances2.push(distance);
  }
}

//console.log(galaxies2);
//console.log(distances2);
console.log(`answer b: ${distances2.reduce((prev, curr) => prev + curr)}`);
