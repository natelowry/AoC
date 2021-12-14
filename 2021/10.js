

//AOC10a
var input = document.body.innerText.trim()
var lines = input.split("\n")
var leftChars = ['(', '[', '{', '<']
var rightChars = [')', ']', '}', '>']
function closerChar(openingChar) { return rightChars[leftChars.indexOf(openingChar)] }
var badChars = []

for (var i = 0; i < lines.length; i++) {
	var chars = lines[i].split('')
	var stack = []
	for (var j = 0; j < chars.length; j++) {
		var currentChar = chars[j]
		//console.log(currentChar)
		if (leftChars.indexOf(currentChar) >= 0) {
			stack.push(currentChar)
			//console.log("push" + currentChar)
		} else {
			if (closerChar(stack[stack.length-1]) == currentChar) {
				stack.pop()
			//console.log("pop" + currentChar)
			} else {
				badChars.push(currentChar)
				j = chars.length
			//console.log("bad" + currentChar)
			}
		}
	}
}

console.log(badChars)
var total = 0
for (var i = 0; i < badChars.length; i++) {
	switch (badChars[i]) {
		case ')': 
		total += 3
		break
		case ']':
		total += 57
		break
		case '}':
		total += 1197
		break
		case '>':
		total += 25137
		break
	}
}

console.log(total)

//AOC10b
var input = document.body.innerText.trim()

	var lines = input.split("\n")
	var leftChars = ['(', '[', '{', '<']
	var rightChars = [')', ']', '}', '>']
function closerChar(openingChar) {
	return rightChars[leftChars.indexOf(openingChar)]
}
var scores = []

for (var i = 0; i < lines.length; i++) {
	var chars = lines[i].split('')
		var stack = []
		for (var j = 0; j < chars.length; j++) {
			var currentChar = chars[j]
				if (leftChars.indexOf(currentChar) >= 0) {
					stack.push(currentChar)
				} else {
					if (closerChar(stack[stack.length - 1]) == currentChar) {
						stack.pop()
					} else {
						//error
						j = chars.length
						stack = []
					}
				}
		}
		stack.reverse()
		var total = 0
		for (var k = 0; k < stack.length; k++) {
			total = total * 5
				switch (stack[k]) {
				case '(':
					total += 1
					break
				case '[':
					total += 2
					break
				case '{':
					total += 3
					break
				case '<':
					total += 4
					break
				}
		}
		if (total > 0) {scores.push(total)}
}
console.log(scores)
var mid = scores.sort((a,b) => a-b)[Math.floor(scores.length / 2)]
console.log(mid)
