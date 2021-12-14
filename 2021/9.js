
//AOC9a
var input = document.body.innerText.trim()
var grid = input.split("\n").map(x => x.split("").map(Number))
var foundSinks = []

for (var y = 0; y < grid.length; y++) {
	for (var x = 0; x < grid[0].length; x++) {
		//if they have a lower one nearby, continue
		var value = grid[y][x]
		//up, down, left, right
		if ((y != 0 && (grid[y-1][x] <= value)) 
		|| (y != (grid.length-1) && (grid[y+1][x] <= value))
		|| (x != 0 && (grid[y][x-1] <= value)) 
		|| (x != (grid[y].length-1) && (grid[y][x+1] <= value))) {
			continue
		}
		foundSinks.push(value)
	}
}

var totalRisk = foundSinks.reduce((p, c) => p + c + 1, 0)
console.log(totalRisk)


//AOC9b
var input = document.body.innerText.trim()

var grid = input.split("\n").map(x => x.split("").map(Number))
var foundSinks = []

for (var y = 0; y < grid.length; y++) {
	for (var x = 0; x < grid[0].length; x++) {
		//if they have a lower one nearby, continue
		var value = grid[y][x]
		//up, down, left, right
		if ((y != 0 && (grid[y-1][x] <= value)) 
		|| (y != (grid.length-1) && (grid[y+1][x] <= value))
		|| (x != 0 && (grid[y][x-1] <= value)) 
		|| (x != (grid[y].length-1) && (grid[y][x+1] <= value))) {
			continue
		}
		var totalSize = 0
		foundSinks.push({x,y,value,totalSize})
	}
}

var visitedSpots = []

function getBasinSize(x, y) {
	if (visitedSpots.filter(s => s.x == x && s.y == y).length > 0) {
		return 0
	}
	visitedSpots.push({x,y})
	
	var total = 1 //current spot
	//can go left
	if (x != 0 && grid[y][x-1] != 9) {
		total += getBasinSize(x-1, y)
	}
	//can go right
	if (x != (grid[y].length-1) && grid[y][x+1] != 9) {
		total += getBasinSize(x+1, y)
	}
	//up
	if (y != 0 && grid[y-1][x] != 9) {
		total += getBasinSize(x, y-1)
	}
	//down
	if (y != (grid.length-1) && grid[y+1][x] != 9) {
		total += getBasinSize(x, y+1)
	}
	return total
}

for (var i = 0; i < foundSinks.length; i++) {
 var currentSink = foundSinks[i]	
 foundSinks[i].totalSize = getBasinSize(currentSink.x, currentSink.y)
}

var sortedSizes = foundSinks.map(f => f.totalSize).sort((x,y) => y-x)
var total = sortedSizes[0] * sortedSizes[1] * sortedSizes[2]

