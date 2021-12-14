
//AOC13a

var input = document.body.innerText.trim()

// input = 
// `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`

var dots = input.split('\n').filter(x => x.includes(","))
var folds = input.split('\n').filter(x => x.includes("fold"))
var largestX = dots.map(x => x.split(",").map(Number)[0]).sort((x, y) => y - x)[0] + 1
var largestY = dots.map(x => x.split(",").map(Number)[1]).sort((x, y) => y - x)[0] + 1


var grid = [...Array(largestX)].map(x => x = Array(largestY))

for (var i = 0; i < dots.length; i++) {
	var currentDot = dots[i]
	var x = currentDot.split(",")[0]
	var y = currentDot.split(",")[1]
	grid[x][y] = '#'
}

for (var i = 0; i < folds.length; i++) {
	var currentFold = folds[i]
	var foldInXAxes = currentFold.includes('x')
	var foldNumber = currentFold.split('=').reverse()[0]
	
	var newXSize = foldInXAxes ? Math.ceil(grid.length / 2) : grid.length
	var newYSize = foldInXAxes ? grid[0].length : Math.ceil(grid[0].length / 2)
	
	var newGrid = [...Array(newXSize)].map(x => x = Array(newYSize))
	
	for (var x = 0; x < newXSize; x++) {
		for (var y = 0; y < newYSize; y++) {
			newGrid[x][y] = grid[x][y]
			
			var foldSpotX = foldInXAxes ? grid.length - x - 1 : x
			var foldSpotY = foldInXAxes ? y : grid[0].length - y - 1
			if (grid[foldSpotX][foldSpotY] == '#') {
				newGrid[x][y] = '#'
			}			
		}
	}	
	
	grid = newGrid
	break //part a break
}

var count = 0
for (var x = 0; x < grid.length; x++) {
	for (var y = 0; y < grid[0].length; y++) {
		if (grid[x][y] == '#') {
			count++
		}
	}
}

console.log(count) 

//AOC13b

var input = document.body.innerText.trim()

// input = 
// `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`

var dots = input.split('\n').filter(x => x.includes(","))
var folds = input.split('\n').filter(x => x.includes("fold"))
var largestX = dots.map(x => x.split(",").map(Number)[0]).sort((x, y) => y - x)[0] + 1
var largestY = dots.map(x => x.split(",").map(Number)[1]).sort((x, y) => y - x)[0] + 1


var grid = [...Array(largestX)].map(x => x = Array(largestY))

for (var i = 0; i < dots.length; i++) {
	var currentDot = dots[i]
	var x = parseInt(currentDot.split(",")[0], 10)
	var y = parseInt(currentDot.split(",")[1], 10)
	grid[x][y] = '#'
}

for (var i = 0; i < folds.length; i++) {
	var currentFold = folds[i]
	var foldInXAxes = currentFold.includes('x')
	var foldNumber = parseInt(currentFold.split('=').reverse()[0], 10)
	
	var newXSize = foldInXAxes ? Math.ceil(grid.length / 2) - 1 : grid.length
	var newYSize = foldInXAxes ? grid[0].length : Math.ceil(grid[0].length / 2) - 1
	
	var newGrid = [...Array(newXSize)].map(x => x = Array(newYSize))
	
	for (var x = 0; x < newXSize; x++) {
		for (var y = 0; y < newYSize; y++) {
			newGrid[x][y] = grid[x][y]
			
			var foldSpotX = foldInXAxes ? grid.length - x - 1 : x
			var foldSpotY = foldInXAxes ? y : grid[0].length - y - 1
			if (grid[foldSpotX][foldSpotY] == '#') {
				newGrid[x][y] = '#'
			}			
		}
	}	
	
	grid = newGrid
}

var str = ''
for (var y = 0; y < grid[0].length; y++) {
	for (var x = 0; x < grid.length; x++) {
		if (grid[x][y] == '#') {
			str = str + "#"
		} else {
			str = str + "."
		}
		
		if ((x+1) % 5 == 0) {
			str = str + '   '
		}
	}
	str = str + "\n"
}

console.log(str) 
//RCPLAKHL
