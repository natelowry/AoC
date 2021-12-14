
//AOC7a
var crabs = document.body.innerText.trim().split(',').map(Number)
var sortedCrabs = crabs.sort((x,y) => x - y)
var median = sortedCrabs[sortedCrabs.length / 2]
var totalDistance = crabs.map(x => Math.abs(x - median)).reduce((p,c) => p + c)

//AOC7b
var crabs = document.body.innerText.trim().split(',').map(Number)
var sortedCrabs = crabs.sort((x,y) => x - y)

var bestFuel = 106434480
for (var i = 0; i < sortedCrabs[sortedCrabs.length - 1]; i++) {
	var totalDistance = crabs.map(x => Math.abs(x - i)).map(x => (x * (x+1)) / 2).reduce((p,c) => p + c)
	if (totalDistance < bestFuel) {
		bestFuel = totalDistance
	}
}
