
//AOC4a
var lines = document.body.innerText.trim().split('\n')
var calls = lines.splice(0,1)[0].split(',').map(x => parseInt(x, 10))
var boards = []
while (lines.length > 4) {
  lines.splice(0,1)
  var board = lines.splice(0,5).map(x => x.split(' ').map(y => parseInt(y,10)).filter(z => !isNaN(z)))
  boards.push(board)
}

for (var i = 0; i < calls.length; i++) {
  var call = calls[i]
  
  for (var j = 0; j < boards.length; j++) {
    var board = boards[j]
    for (var k = 0; k < 5; k++) {
	  for (var l = 0; l < 5; l++) {
	    if (call == board[k][l]) {
		  board[k][l] = board[k][l] + "x" 
		}
		//check rows
		if (board[k].filter(x => ("" + x).includes("x")).length == 5) {
		  console.log("winner: " + board)
		  var sum = board.map(x => x.filter(y => !(""+y).includes("x"))).filter(z => z.length).map(x => x.reduce((p,c) => p+c)).reduce((p,c) => p+c)
		  console.log(sum * call)
		  l = k = j = i = 12341234123
		}
		
	    //check cols
	    if ([...Array(5).keys()].filter(x => (""+board[x][l]).includes("x")).length == 5) {
		  console.log("winner: " + board)
		  var sum = board.map(x => x.filter(y => !(""+y).includes("x"))).filter(z => z.length).map(x => x.reduce((p,c) => p+c)).reduce((p,c) => p+c)
		  console.log(sum * call)
		  l = k = j = i = 12341234123
	    }
	  }
	}	
  }  
}

//AOC4b
var lines = document.body.innerText.trim().split('\n')
var calls = lines.splice(0,1)[0].split(',').map(x => parseInt(x, 10))
var boards = []
while (lines.length > 4) {
  lines.splice(0,1)
  var board = lines.splice(0,5).map(x => x.split(' ').map(y => parseInt(y,10)).filter(z => !isNaN(z)))
  boards.push(board)
}

for (var i = 0; i < calls.length; i++) {
  var call = calls[i]
  
  for (var j = 0; j < boards.length; j++) {
    var board = boards[j]
	if (board.length == 0) { 
        continue;
    }
    for (var k = 0; k < 5; k++) {
	  for (var l = 0; l < 5; l++) {
	    if (call == board[k][l]) {
		  board[k][l] = board[k][l] + "x";
		}
		//check rows
		if (board[k].filter(x => ("" + x).includes("x")).length == 5) {
		  console.log("winner: " + board)
		  var sum = board.map(x => x.filter(y => !(""+y).includes("x"))).filter(z => z.length).map(x => x.reduce((p,c) => p+c)).reduce((p,c) => p+c)
		  console.log(sum * call)
		  boards[j] = []
		  l = k = 6
		  continue
		}
		
	    //check cols
	    if ([...Array(5).keys()].filter(x => (""+board[x][l]).includes("x")).length == 5) {
		  console.log("winner: " + board)
		  var sum = board.map(x => x.filter(y => !(""+y).includes("x"))).filter(z => z.length).map(x => x.reduce((p,c) => p+c)).reduce((p,c) => p+c)
		  console.log(sum * call)	
		  boards[j] = []
		  l = k = 6
		  continue
	    }
	  }
	}	
  }  
}
