//AOC19a
var practice = `--- scanner 0 ---
0,2
4,1
3,3

--- scanner 1 ---
-1,-1
-5,0
-2,1`;

practice = `--- scanner 0 ---
-1,-1,1
-2,-2,2
-3,-3,3
-2,-3,1
5,6,-4
8,0,7

--- scanner 0 ---
1,-1,1
2,-2,2
3,-3,3
2,-1,3
-5,4,-6
-8,-7,0

--- scanner 0 ---
-1,-1,-1
-2,-2,-2
-3,-3,-3
-1,-3,-2
4,6,5
-7,0,8

--- scanner 0 ---
1,1,-1
2,2,-2
3,3,-3
1,3,-2
-4,-6,5
7,0,8

--- scanner 0 ---
1,1,1
2,2,2
3,3,3
3,1,2
-6,-4,-5
0,7,-8`;

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? practice
    : document.body.innerText.trim();

var sets = 
input.split("\n\n")
.map(x => x.split('---')[2].trim().split('\n').map(x => x.split(',').map(Number)));

console.log(sets);

var set1 = sets[0];
var set2 = sets[1];

var largestMagnitude = sets
.flatMap(s => 
  s.map(p =>
  Math.max(...p.map(Math.abs)
   )))
.sort().reverse()[0];

//console.log(largestMagnitude);
//compare 1 and 2, register it

//try the bottom left point of s1 
//on top of all the points
//in the bottom left quadrent of s2
//does it work? (at least 12 matches)
//rotate and try again (in both dimensions)

//try lining up each point one at a time
for (var i = 0; i < set1.length; i++) {
  var set1Item = set1[i];
  for (var j = 0; j < set2.length; j++) {
    var set2Item = set2[j];
    
    var currentTransformation = getTransform(set1Item, set2Item);
    var transformedSet2 = set2.map(x => transformPoint(x, currentTransformation));
    var numberOfMatchedPoints = setOverlap(set1, transformedSet2);
    
    console.log(`${currentTransformation} ${numberOfMatchedPoints}`)
  }
}

function setOverlap(s1, s2) {
  return s1.filter(x => s2.some(y => pointsAreEqual(x,y))).length;
}

function pointsAreEqual(x, y) {
 return x.every((v,i) => x[i] == y[i]);
}

function getTransform(from, to) {
  return from.map((v, idx) => from[idx] - to[idx]);
}
 
function transformPoint(point, transform) {
  return point.map((v, i) => point[i] + transform[i]);
}

// var currentTransformation = [0,0,0]; //x,y,z (eventually rotx, roty, rotz)
// var matchedPoints = 0;
// scanner1.forEach(element => {
  
// });


console.log(set1[0].map((v,i ) => set1[0][i] - set2[0][i]));



//continue to register more and more