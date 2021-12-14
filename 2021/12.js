
//AOC12a

var input = document.body.innerText.trim()

input = 
`start-A
start-b
A-c
A-b
b-d
A-end
b-end`

// input = 
// `dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc`

// input = 
// `fs-end
// he-DX
// fs-he
// start-DX
// pj-DX
// end-zg
// zg-sl
// zg-pj
// pj-he
// RW-he
// fs-DX
// pj-RW
// zg-RW
// start-pj
// he-WI
// zg-he
// pj-fs
// start-RW`

var edges = input.split('\n').map(x => x.split('-'))
var nodes = []

for (var i = 0; i < edges.length; i++) {
	var n1 = edges[i][0]
	var n2 = edges[i][1]
	if (!nodes[n1]) {
		nodes[n1] = { connections: [] }
	}
	if (!nodes[n2]) {
		nodes[n2] = { connections: [] }
	}
	nodes[n1].connections.push(n2)
	nodes[n2].connections.push(n1)	
}


var validPaths = []

findPathsToEnd('start', [])


function findPathsToEnd(nodeName, currentPath) {
	if (currentPath.length > 500) {
		console.log("ERROR: " + currentPath)
		return
	}
	
	//console.log("at node: " + nodeName + " path: " + currentPath)
	var connectionsForThisNode = nodes[nodeName].connections
	
	for (var c = 0; c < connectionsForThisNode.length; c++) {
		var nextNodeName = connectionsForThisNode[c]
		var nextNode = nodes[nextNodeName]
		//console.log('checking: ' + nextNodeName)
		if (nextNodeName == 'end') {
			//console.log('hit the end')
			validPaths.push(currentPath.concat(nextNodeName))
			continue
		}
		if (nextNodeName == 'start') {
			//console.log('hit the start')
			continue
		}
		var isBigCave = nextNodeName == nextNodeName.toUpperCase()
		//console.log(isBigCave ? "big" : "small")
		
		if (isBigCave) {
			findPathsToEnd(nextNodeName, currentPath.concat(nextNodeName))
		} else if (currentPath.indexOf(nextNodeName) < 0) {
			//small cave we've never been to
			findPathsToEnd(nextNodeName, currentPath.concat(nextNodeName))
		}
	}
}

console.log(validPaths.length)

//AOC12b

var input = document.body.innerText.trim()

	input =
	`start-A
start-b
A-c
A-b
b-d
A-end
b-end`

	// input =
	// `dc-end
	// HN-start
	// start-kj
	// dc-start
	// dc-HN
	// LN-dc
	// HN-end
	// kj-sa
	// kj-HN
	// kj-dc`

	// input =
	// `fs-end
	// he-DX
	// fs-he
	// start-DX
	// pj-DX
	// end-zg
	// zg-sl
	// zg-pj
	// pj-he
	// RW-he
	// fs-DX
	// pj-RW
	// zg-RW
	// start-pj
	// he-WI
	// zg-he
	// pj-fs
	// start-RW`

	var edges = input.split('\n').map(x => x.split('-'))
	var nodes = []

	for (var i = 0; i < edges.length; i++) {
		var n1 = edges[i][0]
			var n2 = edges[i][1]
			if (!nodes[n1]) {
				nodes[n1] = {
					connections: []
				}
			}
			if (!nodes[n2]) {
				nodes[n2] = {
					connections: []
				}
			}
			nodes[n1].connections.push(n2)
			nodes[n2].connections.push(n1)
	}

	var validPaths = []

	findPathsToEnd('start', [])

function findPathsToEnd(nodeName, currentPath) {
	if (currentPath.length > 500) {
		console.log("ERROR: " + currentPath)
		return
	}

	//console.log("at node: " + nodeName + " path: " + currentPath)
	var connectionsForThisNode = nodes[nodeName].connections

		for (var c = 0; c < connectionsForThisNode.length; c++) {
			var nextNodeName = connectionsForThisNode[c]
				var nextNode = nodes[nextNodeName]
				//console.log('checking: ' + nextNodeName)
				if (nextNodeName == 'end') {
					//console.log('hit the end')
					validPaths.push(currentPath.concat(nextNodeName))
					continue
				}
				if (nextNodeName == 'start') {
					//console.log('hit the start')
					continue
				}
				var isBigCave = nextNodeName == nextNodeName.toUpperCase()
				//console.log(isBigCave ? "big" : "small")

				if (isBigCave) {
					findPathsToEnd(nextNodeName, currentPath.concat(nextNodeName))
				} else {
					var weveBeenToASmallCaveTwice = Object.values(currentPath.filter(x => x.toUpperCase() != x).reduce(function (acc, curr) {
								return acc[curr] ? ++acc[curr] : acc[curr] = 1,
								acc
							}, {})).includes(2)

						var weveBeenToThisNextSmallCaveThisManyTimes = currentPath.filter(p => p == nextNodeName).length
						if (weveBeenToASmallCaveTwice && weveBeenToThisNextSmallCaveThisManyTimes > 0) {
							continue
						} else {
							//small cave we've never been to (or the first double cave)
							findPathsToEnd(nextNodeName, currentPath.concat(nextNodeName))
						}
				}
		}
}

console.log(validPaths.length)
