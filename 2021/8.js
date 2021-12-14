
//AOC8a 
var input = document.body.innerText.trim()
var entries = input.split('\n')
var inputs = entries.map(x => x.split("|")[0].trim().split(" "))
var outputs = entries.map(x => x.split("|")[1].trim().split(" "))

var countOf1478 = outputs.reduce((prev, curr) => prev + curr.map(x => x.length).filter(x => [2,3,4,7].indexOf(x) >= 0).length, 0)

//AOC8b
var input = document.body.innerText.trim()

// 0000
// 1  2
// 1  2
// 3333
// 4  5
// 4  5
// 6666

//segment 0 1 2 3 4 5 6
//count   8 6 8 7 4 9 7

var entries = input.split('\n')

var total = 0
for (var i = 0; i < entries.length; i++) {
	var currentEntry = entries[i]
	var inputs = currentEntry.split("|")[0].trim().split(" ")
	var outputs =  currentEntry.split("|")[1].trim().split(" ")
	var digitMapping = Array(10)
	digitMapping[1] = [...currentEntry.replace(" |", "").split(" ").filter(x => x.length == 2)[0]].sort()
	digitMapping[7] = [...currentEntry.replace(" |", "").split(" ").filter(x => x.length == 3)[0]].sort()
	digitMapping[8] = [...currentEntry.replace(" |", "").split(" ").filter(x => x.length == 7)[0]].sort()
	digitMapping[4] = [...currentEntry.replace(" |", "").split(" ").filter(x => x.length == 4)[0]].sort()
	
	var charCounts = [...inputs].flatMap(x => [...x]).reduce(function (prev, curr) { prev[curr] = (prev[curr] || 0) + 1; return prev}, {})
	
	var segmentMapping = Array(7)
	segmentMapping[0] = [...digitMapping[7]].filter(x => digitMapping[1].indexOf(x) < 0)[0]
	segmentMapping[1] = Object.keys(charCounts).filter(x => charCounts[x] == 6)[0]
	segmentMapping[2] = Object.keys(charCounts).filter(x => charCounts[x] == 8 && x != segmentMapping[0])[0]
	segmentMapping[3] = Object.keys(charCounts).filter(x => charCounts[x] == 7 && digitMapping[4].indexOf(x) >= 0)[0]//exists in digit 4
	segmentMapping[4] = Object.keys(charCounts).filter(x => charCounts[x] == 4)[0]
	segmentMapping[5] = Object.keys(charCounts).filter(x => charCounts[x] == 9)[0]
	segmentMapping[6] = Object.keys(charCounts).filter(x => charCounts[x] == 7 && x != segmentMapping[3])[0]
	
	digitMapping[0] = [0,1,2,4,5,6].map(x => segmentMapping[x]).sort()
	digitMapping[2] = [0,2,3,4,6].map(x => segmentMapping[x]).sort()
	digitMapping[3] = [0,2,3,5,6].map(x => segmentMapping[x]).sort()
	digitMapping[5] = [0,1,3,5,6].map(x => segmentMapping[x]).sort()
	digitMapping[6] = [0,1,3,4,5,6].map(x => segmentMapping[x]).sort()
	digitMapping[9] = [0,1,2,3,5,6].map(x => segmentMapping[x]).sort()
	
	var digits = digitMapping.map(x => x.sort().join(""))
	
	var outputDigits = outputs.map(x => [...x].sort().join("")).map(x => digits.indexOf(x))

	var outputNumber = outputDigits[0] * 1000 + outputDigits[1] * 100 + outputDigits[2] * 10 + outputDigits[3]
	
	total += outputNumber
}

console.log(total)