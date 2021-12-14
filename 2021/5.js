
//AOC5a
var grid = []
for (var i = 0; i < 1000; i++) {
	grid[i] = []
	for (var j = 0; j < 1000; j++) {
		grid[i][j] = 0
	}
}

var lines = document.body.innerText.trim().split("\n").map(x => x.trim())

for (var i = 0; i < lines.length; i++) {
	var matches = lines[i].match(/(\d+),(\d+) -> (\d+),(\d+)/)
	var x1 = matches[1]
	var y1 = matches[2]
	var x2 = matches[3]
	var y2 = matches[4]
	
	
	if (y1 == y2) {
		//horizontal line
		for (var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			grid[x][y1] = grid[x][y1] + 1
		}
	} 
	else if (x1 == x2)
	{
		//vertical line
		for (var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			grid[x1][y] = grid[x1][y] + 1
		}
	}
	else
	{
	//not h or v
		//console.log("errrrorrrr")
	}
}

var atLeast2 = 0
for (var i = 0; i < 1000; i++) {
	for (var j = 0; j < 1000; j++) {
		if (grid[i][j] >= 2) {
			atLeast2++
		}
	}
}

atLeast2


//AOC5b
var grid = []
for (var i = 0; i < 1000; i++) {
	grid[i] = []
	for (var j = 0; j < 1000; j++) {
		grid[i][j] = 0
	}
}

var lines = document.body.innerText.trim().split("\n").map(x => x.trim())

for (var i = 0; i < lines.length; i++) {
	var matches = lines[i].match(/(\d+),(\d+) -> (\d+),(\d+)/)
	var x1 = parseInt(matches[1], 10)
	var y1 = parseInt(matches[2], 10)
	var x2 = parseInt(matches[3], 10)
	var y2 = parseInt(matches[4], 10)
	
	
	if (y1 == y2) {
		//horizontal line
		for (var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			grid[x][y1] = grid[x][y1] + 1
		}
	} 
	else if (x1 == x2)
	{
		//vertical line
		for (var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			grid[x1][y] = grid[x1][y] + 1
		}
	}
	else
	{
		//diagonal
		var xInc = x1 < x2 ? 1 : -1
		var yInc = y1 < y2 ? 1 : -1
		
		for (var x = x1, y = y1; ; x += xInc, y += yInc) {
			if (x < Math.min(x1, x2) || x > Math.max(x1, x2) || y < Math.min(y1, y2) || y > Math.max(y1, y2)) {
				break
			}
		
			grid[x][y] = grid[x][y] + 1
		}		
	}
}

var atLeast2 = 0
for (var i = 0; i < 1000; i++) {
	for (var j = 0; j < 1000; j++) {
		if (grid[i][j] >= 2) {
			atLeast2++
		}
	}
}

console.log(atLeast2)
