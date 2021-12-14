
//AOC3a
var x = document.body.innerText.trim().split('\n').map((x, i) => x.split("").map(y => parseInt(y,10))).reduce((prev, cur) => cur.map((p, i2) => p + prev[i2]),[0,0,0,0,0,0,0,0,0,0,0,0]).map(x => x > 500 ? "1":"0").join("")
var y = document.body.innerText.trim().split('\n').map((x, i) => x.split("").map(y => parseInt(y,10))).reduce((prev, cur) => cur.map((p, i2) => p + prev[i2]),[0,0,0,0,0,0,0,0,0,0,0,0]).map(x => x <= 500 ? "1":"0").join("")
parseInt(x,2) * parseInt(y,2)

//AOC3b
var theList = document.body.innerText.trim().split('\n')
var index = 0
while (theList.length > 1) {
	var mostCommonBit = theList.map(x => x[index]).filter(x => x == "1").length >= (theList.length/2) ? "1" : "0"
	theList = theList.filter(x => x[index] == mostCommonBit)
	index++
}
var ox = theList[0]

theList = document.body.innerText.trim().split('\n')
index = 0
while (theList.length > 1) {
	var leastCommonBit = theList.map(x => x[index]).filter(x => x == "1").length >= (theList.length/2) ? "0" : "1"
	theList = theList.filter(x => x[index] == leastCommonBit)
	index++
}
var co = theList[0]
parseInt(ox,2) * parseInt(co,2)
//not 4206585
