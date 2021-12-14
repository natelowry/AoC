
//AOC14a

var input = document.body.innerText.trim()

var sinput = ''
sinput =
`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

var template = input.split('\n')[0]

var insertRules = {}
input.split('\n').filter(x => x.includes('-')).forEach(x => insertRules[x.split(" ")[0]] = x.split(" ").reverse()[0])

for (var currentStep = 0; currentStep < 10; currentStep++) {
	var insertAts = []
	for (var currentRule in insertRules) {		
		[...template.matchAll("(?=("+currentRule+"))")].forEach(x => insertAts.push({index: x.index, toInsert: insertRules[currentRule]}))		
	}

	insertAts = insertAts.sort((x, y) => x.index - y.index)
	while (insertAts.length > 0) {
		var current = insertAts.splice(0, 1)[0]
		
		//console.log('inserting ' + current.toInsert + ' at ' + current.index)

		var tempTemplate = template.split('')
		tempTemplate.splice(current.index + 1, 0, current.toInsert)
		template = tempTemplate.join('')

		for (var i = 0; i < insertAts.length; i++) {
			var tmp = insertAts[i]
				tmp.index += 1
				insertAts[i] = tmp
		}
	}	
	//console.log(currentStep + " " + template.length + " " + template)
}

var letterFreq = []
template.split('').forEach(x => letterFreq[x] = (letterFreq[x] || 0) + 1)

var mostCommonLetter = ''
var mostCommonAmount = 0
var leastCommonLetter = ''
var leastCommonAmount = Number.MAX_SAFE_INTEGER
for (var letter in letterFreq) {
	var amt = letterFreq[letter]
	if (amt > mostCommonAmount)
	{
		mostCommonAmount = amt
		mostCommonLetter = letter
	}
	if (amt < leastCommonAmount)
	{
		leastCommonAmount = amt
		leastCommonLetter = letter
	}
}

console.log(mostCommonAmount - leastCommonAmount)

//AOC14b

var input = document.body.innerText.trim()

var sinput = ''
sinput =
`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

var template = input.split('\n')[0]

var date = new Date()

var insertRules = {}
input.split('\n').filter(x => x.includes('-')).forEach(x => insertRules[x.split(" ")[0]] = x.split(" ").reverse()[0])

var numberOfPairs = {}
input.split('\n').filter(x => x.includes('-')).forEach(x => numberOfPairs[x.split(" ")[0]] = 0);

[...template].reduce(function (prev, curr) { numberOfPairs[prev+curr] = (numberOfPairs[prev+curr] || 0) + 1; return curr})

var adjustments = {}
input.split('\n').filter(x => x.includes('-')).forEach(x => adjustments[x.split(" ")[0]] = 0);


for (var currentStep = 0; currentStep < 40; currentStep++) {
	adjustments = {}
	input.split('\n').filter(x => x.includes('-')).forEach(x => adjustments[x.split(" ")[0]] = 0);


	for (var currentPair in numberOfPairs) {
		var number = numberOfPairs[currentPair]
		if (number == 0) {
			continue
		}
		//console.log("splitting: " + currentPair + " x" + numberOfPairs[currentPair])
		var spawn1 = currentPair[0] + insertRules[currentPair]
		var spawn2 = insertRules[currentPair] + currentPair[1]
		
		adjustments[spawn1] += number
		adjustments[spawn2] += number
		adjustments[currentPair] -= number
		
		//console.log("spawned :" + spawn1 + " " + spawn2)
	}
	
	for (var currentAdjustment in adjustments) {
		numberOfPairs[currentAdjustment] += adjustments[currentAdjustment]
	}
	console.log(currentStep)
}

var letterFreq = []
var isFirst = true
for (var currentPair in numberOfPairs) {
	if (isFirst) {
		letterFreq[currentPair[0]] = (letterFreq[currentPair[0]] || 0) + numberOfPairs[currentPair]
		isFirst = false
	}
	letterFreq[currentPair[1]] = (letterFreq[currentPair[1]] || 0) + numberOfPairs[currentPair]
}

var mostCommonLetter = ''
var mostCommonAmount = 0
var leastCommonLetter = ''
var leastCommonAmount = Number.MAX_SAFE_INTEGER
for (var letter in letterFreq) {
	var amt = letterFreq[letter]
	if (amt > mostCommonAmount)
	{
		mostCommonAmount = amt
		mostCommonLetter = letter
	}
	if (amt < leastCommonAmount)
	{
		leastCommonAmount = amt
		leastCommonLetter = letter
	}
}

console.log(mostCommonAmount - leastCommonAmount)





