
//AOC11a
var input = document.body.innerText.trim()

// input = 
// `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`

var octos = input.split('\n').map(x => x.trim().split('').map(Number))

var flashed = 0

for (var completedSteps = 0; completedSteps < 100; completedSteps++) {
	//flashedThisRound
	var toFlash = []
	var alreadyFlashed = []
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			var newVal = octos[y][x] + 1
			octos[y][x] = newVal
			if (newVal == 10) {
				toFlash.push({x,y})
			}
		}
	}
	
	//console.log('going to flash:')
	//console.log(toFlash)
	
		
	while (toFlash.length > 0) {
		var currentFlasher = toFlash.pop()
		//console.log('flashing ' + currentFlasher.x + " " + currentFlasher.y) 
		//flash this one
		
		for (var x = Math.max(0, currentFlasher.x - 1); x <= Math.min(9, currentFlasher.x + 1); x++) {
			for (var y = Math.max(0, currentFlasher.y - 1); y <= Math.min(9, currentFlasher.y + 1); y++) {
				if (
					alreadyFlashed.filter(f => f.x == x && f.y == y).length > 0 
					|| toFlash.filter(f => f.x == x && f.y == y).length > 0 
					|| (x == currentFlasher.x && y == currentFlasher.y)) {
					continue
				}
				//console.log("setting " + x + "," + y + " to " + (octos[y][x] + 1))
				var newVal = octos[y][x] + 1
				octos[y][x] = newVal
				if (newVal > 9) {
					toFlash.push({x,y})
				}
			}
		}
		
		//toFlash = [] //////NONONONONO
		
		//add it to the list of alreadyFlashed
		alreadyFlashed.push(currentFlasher)
		
		//add to total
		flashed += 1
	}
	
	//console.log(octos)
	
	//reset all flashed octos to 0
	for (var i = 0; i < alreadyFlashed.length; i++) {
		var cur = alreadyFlashed[i]
		octos[cur.y][cur.x] = 0
	}
		
	//console.log(octos)
}

//AOC11b
var input = document.body.innerText.trim()

// input = 
// `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`

var octos = input.split('\n').map(x => x.trim().split('').map(Number))

var flashed = 0

for (var completedSteps = 0; completedSteps < 1000; completedSteps++) {
	//flashedThisRound
	var toFlash = []
	var alreadyFlashed = []
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			var newVal = octos[y][x] + 1
			octos[y][x] = newVal
			if (newVal == 10) {
				toFlash.push({x,y})
			}
		}
	}
	
	//console.log('going to flash:')
	//console.log(toFlash)
	
		
	while (toFlash.length > 0) {
		var currentFlasher = toFlash.pop()
		//console.log('flashing ' + currentFlasher.x + " " + currentFlasher.y) 
		//flash this one
		
		for (var x = Math.max(0, currentFlasher.x - 1); x <= Math.min(9, currentFlasher.x + 1); x++) {
			for (var y = Math.max(0, currentFlasher.y - 1); y <= Math.min(9, currentFlasher.y + 1); y++) {
				if (
					alreadyFlashed.filter(f => f.x == x && f.y == y).length > 0 
					|| toFlash.filter(f => f.x == x && f.y == y).length > 0 
					|| (x == currentFlasher.x && y == currentFlasher.y)) {
					continue
				}
				//console.log("setting " + x + "," + y + " to " + (octos[y][x] + 1))
				var newVal = octos[y][x] + 1
				octos[y][x] = newVal
				if (newVal > 9) {
					toFlash.push({x,y})
				}
			}
		}
		
		//toFlash = [] //////NONONONONO
		
		//add it to the list of alreadyFlashed
		alreadyFlashed.push(currentFlasher)
		
		//add to total
		flashed += 1
	}
	
	//console.log(octos)
	//console.log(completedSteps + ": " + alreadyFlashed.length)
	
	if (alreadyFlashed.length == 100) {
		console.log("DONE! " + (completedSteps + 1))
		break
	}
	
	//reset all flashed octos to 0
	for (var i = 0; i < alreadyFlashed.length; i++) {
		var cur = alreadyFlashed[i]
		octos[cur.y][cur.x] = 0
	}
		
	//console.log(octos)
}
