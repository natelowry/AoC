
//AOC2a
var steps = document.body.innerText.trim().split('\n').map(x => x.split(" "))
var h = steps.filter(x => x[0] == "forward").reduce((prev, curr) => prev + parseInt(curr[1], 10), 0)
var vdown = steps.filter(x => x[0] == "down").reduce((prev, curr) => prev + parseInt(curr[1], 10), 0)
var vup = steps.filter(x => x[0] == "up").reduce((prev, curr) => prev + -parseInt(curr[1], 10), 0)
var v = vdown + vup
var ans = h * v

//AOC2b
var steps = document.body.innerText.trim().split('\n').map(x => x.split(" "))
var horizontal_pos = 0
var depth = 0
var aim = 0
for (var i = 0; i < steps.length; i++) {
	var direction = steps[i][0]
	var amount = parseInt(steps[i][1], 10)
	switch(direction) {
		case "down":
			aim -= amount
			break
		case "up":
			aim += amount
			break
		case "forward":
			horizontal_pos += amount
			depth += (aim * amount)
			break
		}
}
var ans = horizontal_pos * -depth
