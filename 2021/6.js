
//AOC6a
var days = 80
var fish = document.body.innerText.trim().split(',')


for (var i = 0; i < days; i++) {
	var fishToPush = 0
	for (var j = 0; j < fish.length; j++) {
		var currentFish = fish[j]
		if (currentFish == 0) {
			fish[j] = 6
			fishToPush++
		} else 
		{
			fish[j] = fish[j] - 1
		}		
	}
	
	for (var k = 0; k < fishToPush; k++) {
		fish.push(8)
	}
	
	console.log(fish)
}

console.log(fish.length)

//AOC6b
var days = 256
var fish = document.body.innerText.trim().split(',')

var dayMaps = [0,0,0,0,0,0,0,0,0]

fish.map(x => dayMaps[x] = dayMaps[x] + 1)

console.log(dayMaps)


for (var i = 0; i < days; i++) {
	
	var pregsFish = dayMaps[0]
	
	for (var j = 0; j < 8; j++) {
		dayMaps[j] = dayMaps[j+1]
	}
	
	dayMaps[6] = dayMaps[6] + pregsFish
	dayMaps[8] = pregsFish
	
	console.log(i + " " + dayMaps + " " + dayMaps.reduce((x,y) => x + y))
}
