//AOC16a
var practice = `CE00C43D881120`;
// `A0016C880162017C3686B18A3D4780`;
//`C0015000016115A2E0802F182340`;
//`620080001611562C8802118E34`;
//`8A004A801A8002F478`;
//`EE00D40C823060`;
//`D2FE28`;

var real = `620D7800996600E43184312CC01A88913E1E180310FA324649CD5B9DA6BFD107003A4FDE9C718593003A5978C00A7003C400A70025400D60259D400B3002880792201B89400E601694804F1201119400C600C144008100340013440021279A5801AE93CA84C10CF3D100875401374F67F6119CA46769D8664E76FC9E4C01597748704011E4D54D7C0179B0A96431003A48ECC015C0068670FA7EF1BC5166CE440239EFC226F228129E8C1D6633596716E7D4840129C4C8CA8017FCFB943699B794210CAC23A612012EB40151006E2D4678A4200EC548CF12E4FDE9BD4A5227C600F80021D08219C1A00043A27C558AA200F4788C91A1002C893AB24F722C129BDF5121FA8011335868F1802AE82537709999796A7176254A72F8E9B9005BD600A4FD372109FA6E42D1725EDDFB64FFBD5B8D1802323DC7E0D1600B4BCDF6649252B0974AE48D4C0159392DE0034B356D626A130E44015BD80213183A93F609A7628537EB87980292A0D800F94B66546896CCA8D440109F80233ABB3ABF3CB84026B5802C00084C168291080010C87B16227CB6E454401946802735CA144BA74CFF71ADDC080282C00546722A1391549318201233003361006A1E419866200DC758330525A0C86009CC6E7F2BA00A4E7EF7AD6E873F7BD6B741300578021B94309ABE374CF7AE7327220154C3C4BD395C7E3EB756A72AC10665C08C010D0046458E72C9B372EAB280372DFE1BCA3ECC1690046513E5D5E79C235498B9002BD132451A5C78401B99AFDFE7C9A770D8A0094EDAC65031C0178AB3D8EEF8E729F2C200D26579BEDF277400A9C8FE43D3030E010C6C9A078853A431C0C0169A5CB00400010F8C9052098002191022143D30047C011100763DC71824200D4368391CA651CC0219C51974892338D0`;

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? real // practice
    : document.body.innerText.trim();

var binary = [];
var inputArray = input.split("");

while (inputArray.length > 0) {
  binary = binary.concat(
    parseInt(inputArray.splice(0, 1).join(""), 16)
      .toString(2)
      .padStart(4, "0")
      .split("")
      .map(Number)
  );
}
var seenVersions = [];
var operations = [];

parsePacket(0);

console.log(`version sum: ${seenVersions.reduce((prev, curr) => curr + prev)}`);

function parsePacket(currentIndex) {
  if (currentIndex > binary.length) {
    return 1234123412341234;
  }

  var version = parseInt(
    binary.slice(currentIndex, currentIndex + 3).join(""),
    2
  );
  seenVersions.push(version);
  var type = parseInt(
    binary.slice(currentIndex + 3, currentIndex + 6).join(""),
    2
  );
  //console.log(`type: ${type}, version: ${version}`);
  //console.log(binary.slice(currentIndex));

  if (type == 4) {
    //literal
    var currentValIndex = currentIndex + 6;
    var keepGoing = true;
    var binaryVals = [];

    while (keepGoing) {
      keepGoing = binary.slice(currentValIndex, currentValIndex + 1) == 1;
      var nextVal = binary.slice(currentValIndex + 1, currentValIndex + 5);
      binaryVals.push(...nextVal);
      currentValIndex += 5;
    }
    var decimalVal = parseInt(binaryVals.join(""), 2);
    // console.log(`literal (${version}): ${decimalVal}`);
    operations.push(decimalVal);
    return currentValIndex;
  } else {
    //operator

    var subPacketBitLength = 123412340;
    var subPacketLength = 123412340;
    if (binary.slice(currentIndex + 6, currentIndex + 7) == 0) {
      //then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
      subPacketBitLength = parseInt(
        binary.slice(currentIndex + 7, currentIndex + 7 + 15).join(""),
        2
      );
      //console.log(`bit length: ${subPacketBitLength}`);
      currentIndex = currentIndex + 7 + 15;
    } else {
      //then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
      subPacketLength = parseInt(
        binary.slice(currentIndex + 7, currentIndex + 7 + 11).join(""),
        2
      );
      // console.log(`packet length: ${subPacketLength}`);
      currentIndex = currentIndex + 7 + 11;
    }

    switch (type) {
      case 0:
        operations.push("sumxxx");
        break;
      case 1:
        operations.push("productxxx");
        break;
      case 2:
        operations.push("minimumxxx");
        break;
      case 3:
        operations.push("maximumxxx");
        break;
      case 5:
        operations.push("greaterthan");
        break;
      case 6:
        operations.push("lessthan");
        break;
      case 7:
        operations.push("equalto");
        break;
      default:
        console.log("invalid packet type");
        break;
    }

    var indexOfThisOperation = operations.length - 1;

    var newIndex = currentIndex;
    var startingIndex = newIndex;
    //console.log(`subPackets (${version}): starting at index: ${startingIndex}`);
    if (isNaN(subPacketBitLength)) {
      return 123412341234;
    }
    var seenPackets = 0;
    for (seenPackets = 0; seenPackets < subPacketLength; seenPackets++) {
      newIndex = parsePacket(newIndex);
      if (newIndex == startingIndex + subPacketBitLength) {
        seenPackets++;
        break;
      }
    }

    if (seenPackets == 0) {
      console.log("why");
    }

    //console.log(indexOfThisOperation);
    operations[indexOfThisOperation] = operations[indexOfThisOperation].replace(
      "xxx",
      `${seenPackets}`
    );
    return newIndex;
  }
}

var answer = getValue(operations);
console.log(answer);

function getValue(theStack) {
  var currentOp = theStack.splice(0, 1)[0];

  if (!isNaN(Number(currentOp))) {
    return { 
      result: currentOp,
      //  count: 1 ,
      };
  }

  if (["greaterthan", "lessthan", "equalto"].includes(currentOp)) {
    var val1 = getValue(theStack);
    //don't need this anymore theStack.splice(0, val1.count);
    var val2 = getValue(theStack);
    switch (currentOp) {
      case "greaterthan":
        return {
          result: val1.result > val2.result ? 1 : 0,
          //count: val1.count + val2.count + 1,
        };
      case "lessthan":
        return {
          result: val1.result < val2.result ? 1 : 0,
          //count: val1.count + val2.count + 1,
        };
      case "equalto":
        return {
          result: val1.result == val2.result ? 1 : 0,
          //count: val1.count + val2.count + 1,
        };
      default:
        console.log(`ERROR: ${currentOp}`);
    }
  } else {
    var values = [];
    var numberOfValues = Number(
      currentOp
        .replace("sum", "")
        .replace("product", "")
        .replace("minimum", "")
        .replace("maximum", "")
    );

    if (numberOfValues <= 0) {
      console.log("poop");
    }
    for (var j = 0; j < numberOfValues; j++) {
      var cur = getValue(theStack);
      if (cur == undefined) {
        console.log("creap");
      }
      values.push(cur.result);
    }
    if (values.length == 0) {
      console.log("Crap");
    }
    switch (
      currentOp
        .split("")
        .filter((x) => isNaN(Number(x)))
        .join("")
    ) {
      case "sum":
        return {
          result: values.reduce((p, c) => p + c),
          // count: totalLength + 1,
        };
      case "product":
        return {
          result: values.reduce((p, c) => p * c),
          // count: totalLength + 1,
        };
      case "maximum":
        return {
          result: values.sort((a, b) => b - a)[0],
          // count: totalLength + 1,
        };
      case "minimum":
        return {
          result: values.sort((a, b) => a - b)[0],
          // count: totalLength + 1,
        };
      default:
        console.log(`ERROR: ${currentOp}`);
    }
  }
}