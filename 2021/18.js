//AOC18a
var practice = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`;

practice = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;

practice = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

// practice = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
// [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
// [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
// [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
// [7,[5,[[3,8],[1,4]]]]
// [[2,[2,2]],[8,[8,1]]]
// [2,9]`;

// practice = `[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]
// [2,9]`;

// practice = `[1,1]
// [2,2]
// [3,3]
// [4,4]
// [5,5]
// [6,6]`;

// var real = 'target area: x=217..240, y=-126..-69';

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? practice
    : document.body.innerText.trim();

var lines = input.split("\n");
var currentValue = strToArr(lines.shift());
//console.log(`start: ${currentValue}`);
var newValue = strToArr(lines.shift());

while (newValue) {
 // console.log(`next: ${JSON.stringify(newValue)}`);
  currentValue = add(currentValue, newValue);
 // console.log(`sum: ${JSON.stringify(currentValue)}`);
  currentValue = reduce(currentValue);
 // console.log(`reduced: ${JSON.stringify(currentValue)}`);
  newValue = strToArr(lines.shift());
}

//magnitude b/c that wasn't dumb enough
function getMagnitudeOfPair(m) {
  return (3*m[0]) + (2*m[1]);
}

function getMagnitude(m) {
  var a = typeof m[0] == 'number' ? m[0] : getMagnitude(m[0]);
  var b = typeof m[1] == 'number' ? m[1] : getMagnitude(m[1]);
  return (3*a) + (2*b);
}
console.log(getMagnitude(currentValue));

//b
var largestMag = 0;
var linesB = input.split("\n");
for (var i = 0; i < linesB.length; i++) {
  for (var j = 0; j < linesB.length; j++) {
    if (i == j) { continue; }
    var magnitude = getMagnitude(reduce(add(strToArr(linesB[i]),strToArr(linesB[j]))));
    largestMag = Math.max(largestMag, magnitude);
  }
}

console.log(`largest: ${largestMag}`);

function strToArr(x) {
  return x && JSON.parse(x);
}

function add(a, b) {
  return [a, b];
}

function reduce(x) {
  var needsExplode = needsToExplode(x);
  var needsSplit = needsToSplit(x);

  while (needsExplode || needsSplit) {
    if (needsExplode) {
      x = explode(x);
    } else {
      split(x);
    }

    needsExplode = needsToExplode(x);
    needsSplit = needsToSplit(x);
  }
  return x;
}


function needsToExplode(x) {
  return x.some(
    (w) =>
      typeof w == "object" &&
      w.some(
        (v) =>
          typeof v == "object" &&
          v.some(
            (u) => typeof u == "object" && u.some((t) => typeof t == "object")
          )
      )
  );
}

function needsToSplit(x) {
  return typeof x == "number" ? x >= 10 : x.some((y) => needsToSplit(y));
}

// var v = [[[[4,0],[5,4]],[[7,7],[6,0]]],[80,[[11,9],[11,0]]]];
// split(v);
// split(v);
// split(v);
// console.log(JSON.stringify(v));

function split(x) {
  for (var i = 0; i < x.length; i++) {
    var cur = x[i];
    if (typeof cur == 'number') {
      if (cur >= 10) {
        x[i] = [Math.floor(cur/2), Math.ceil(cur/2)];
        // console.log(`splitting ${cur} into ${x[i]}`);
        return true;
      }
    } else {
      var res = split(cur);
      if (res) {
        return true;
      }
    }
  }
  return false;
}

function explode(x) {
  var s = JSON.stringify(x);
  //console.log(s);
  var bracketsIn = 0;

  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) == "[") {
      bracketsIn++;
    } else if (s.charAt(i) == "]") {
      bracketsIn--;
    }

    if (bracketsIn > 4) {
      var valToEx = s.substring(i + 1).split("]")[0];
      //console.log(valToEx);
      var leftVal = Number(valToEx.split(",")[0]);
      var rightVal = Number(valToEx.split(",")[1]);
      // console.log(`exploding: ${leftVal} ${rightVal}`);
      var leftExplodyDigits = leftVal.toString().length;
      var leftValDigitIncrease = 0;
      var rightExplodyDigits = rightVal.toString().length;
      var reverseIndexOfLeftNumberToUpdate = [...s.substring(0, i)]
        .reverse()
        .findIndex((z) => !["[", "]", ","].includes(z));
      // console.log(`leftReverseIndex: ${reverseIndexOfLeftNumberToUpdate}`);
      if (reverseIndexOfLeftNumberToUpdate == -1) {
        //TODO:
      } else {
        //need to keep going back until we see a digit
        var endIndexOfLeftNumber = i - reverseIndexOfLeftNumberToUpdate;
        // console.log(`end ${endIndexOfLeftNumber}`);
        var lengthOfOldLeftNumber = [...s.substring(0, endIndexOfLeftNumber)].reverse().findIndex((z) => ["[", "]", ","].includes(z));
        var realIndexOfLeftNumber = endIndexOfLeftNumber - lengthOfOldLeftNumber;//i - reverseIndexOfLeftNumberToUpdate - 1;
        var oldLeftNumber = Number(s.substring(realIndexOfLeftNumber, realIndexOfLeftNumber + lengthOfOldLeftNumber));
        // console.log(`real ${realIndexOfLeftNumber}`);
        // console.log(`old left: ${oldLeftNumber}`);
        var newLeftNumber = oldLeftNumber + leftVal;
        leftValDigitIncrease = newLeftNumber.toString().length - oldLeftNumber.toString().length;
        // console.log(`new left: ${newLeftNumber}`);
        var sArray2 = [...s];
      //  console.log(`before left insert: ${s}`);
        sArray2.splice(
          realIndexOfLeftNumber,
          lengthOfOldLeftNumber,
          [...newLeftNumber.toString()].join("")
        );
        s = sArray2.join("");
      //  console.log(`after left insert:  ${s}`);

        //handle the case of 10 (maybe don't need to)?
      }

      var indexOfRightNumberToUpdate = [...s.substring(i + 3 + leftExplodyDigits + rightExplodyDigits)].findIndex(
        (z) => !["[", "]", ","].includes(z)
      );
      //add 5 to this
     // console.log(`rightIndex: ${indexOfRightNumberToUpdate}`);
      if (indexOfRightNumberToUpdate == -1) {
        //TODO:
      } else {
        var realIndexOfRightNumber = i + indexOfRightNumberToUpdate + 3 + leftExplodyDigits + rightExplodyDigits;
        var oldRightNumber = Number(s.substring(realIndexOfRightNumber).split(',')[0].split(']')[0]);
        //console.log(`old right: ${oldRightNumber}`);
        var newRightNumber = oldRightNumber + rightVal;
        //console.log(`new right: ${newRightNumber}`);
        var sArray = [...s];
      //  console.log(`before right insert: ${s}`);
        sArray.splice(
          realIndexOfRightNumber,
          oldRightNumber.toString().length,
          [...newRightNumber.toString()].join("")
        );
        s = sArray.join("");
      //  console.log(`after right insert:  ${s}`);
      }

      //replace the existing

      var sArr = [...s];
      // console.log(`before replace w/ 0: ${s}`);
      sArr.splice(i + leftValDigitIncrease, 3 + leftExplodyDigits + rightExplodyDigits, "0");
      s = sArr.join("");
      // console.log(`after replace w/ 0: ${s}`);

      break;
    }
  }
  return JSON.parse(s);
}

// compareArrays(explode([[[[[9, 8], 1], 2], 3], 4]), [[[[0, 9], 2], 3], 4]);
// compareArrays(explode([[[[[9, 9], 1], 2], 3], 4]), [[[[0, 10], 2], 3], 4]);
// compareArrays(explode([7, [6, [5, [4, [3, 2]]]]]), [7, [6, [5, [7, 0]]]]);
// compareArrays(explode([[6, [5, [4, [3, 2]]]], 1]), [[6, [5, [7, 0]]], 3]);
// compareArrays(explode([[3, [2, [1, [7, 3]]]],[6, [5, [4, [3, 2]]]],]),[[3, [2, [8, 0]]],[9, [5, [4, [3, 2]]]],]);
// compareArrays(explode([[3, [2, [8, 0]]],[9, [5, [4, [3, 2]]]],]),[[3, [2, [8, 0]]],[9, [5, [7, 0]]],]);
// console.log(explode([[[[12,12],[6,14]],[[15,0],[17,[8,1]]]],[2,9]]));

// console.log(explode([[[[4,0],[5,4]],[[7,7],[6,0]]],[[[[10,10],20],40],[[11,9],[11,0]]]]));

//console.log(needsToSplit([[[[0,7],4],[3,[0,3]]],[1,1]]));
//explode([[[[[9, 8], 1], 2], 3], 4]);
//explode([7,[6,[5,[4,[3,2]]]]]);

// console.log(JSON.stringify(reduce([[[[[9, 8], 1], 2], 3], 4])));
//console.log(strToArr(input));

function compareArrays(a1, a2) {
  var j1 = JSON.stringify(a1);
  var j2 = JSON.stringify(a2);
  var ret = j1 == j2;
  console.log(`${j1} -> ${j2} ${ret}`);
}



// function explodeNope(x) {
//   for (var i = 0; i < x.length; i++) {
//     var ci = x[i];
//     if (typeof ci != "object") {
//       continue;
//     }
//     for (var j = 0; j < ci.length; j++) {
//       var cj = ci[j];
//       if (typeof cj != "object") {
//         continue;
//       }
//       for (var k = 0; k < cj.length; k++) {
//         var ck = cj[k];
//         if (typeof ck != "object") {
//           continue;
//         }
//         for (var l = 0; l < ck.length; l++) {
//           var cl = ck[l];
//           if (typeof cl != "object") {
//             continue;
//           }
//           //this cl = two element array to explode
//           var left = cl[0];
//           var right = cl[1];

//           if (i == 0 && j == 0 && k == 0 && l == 0) {
//             //has nothing to left
//             x[i[j[k[l]]]] = 0;
//           } else {
//           }
//           //has something to left

//           //has nothing to right
//           //has something to right

//           //set to 0

//           i = j = k = l = 123412341234;
//         }
//       }
//     }
//   }

//   return x;
// }