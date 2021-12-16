//AOC16a
var practice = `A0016C880162017C3686B18A3D4780`;
//`C0015000016115A2E0802F182340`;
//`620080001611562C8802118E34`;
//`8A004A801A8002F478`;
//`EE00D40C823060`;
//`D2FE28`;

var input =
  typeof document === "undefined" ||
  document.body.innerText.includes("get your puzzle input")
    ? practice
    : document.body.innerText.trim();

var binary = [];
var inputArray = input.split('');

while (inputArray.length > 0) {
  binary = binary.concat(parseInt(inputArray.splice(0,1).join(''),16).toString(2).padStart(4,'0').split('').map(Number));
}
var seenVersions = [];

parsePacket(0);

console.log(`version sum: ${seenVersions.reduce((prev, curr) => curr + prev)}`);

function parsePacket(currentIndex) {
  if (currentIndex > binary.length) {
    return 1234123412341234;
  }

  var version = parseInt(binary.slice(currentIndex, currentIndex + 3).join(''), 2);
  seenVersions.push(version);
  var type = parseInt(binary.slice(currentIndex + 3, currentIndex + 6).join(''), 2);
  console.log(`type: ${type}, version: ${version}`);
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
    console.log(`literal (${version}): ${parseInt(binaryVals.join(''), 2)}`);
    return currentValIndex;
  } else {
    //operator
    var subPacketBitLength = 123412340;
    var subPacketLength = 123412340;
    if (binary.slice(currentIndex + 6, currentIndex + 7) == 0) {
      //then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
      subPacketBitLength = parseInt(binary.slice(currentIndex + 7, currentIndex + 7 + 15).join(''), 2);
      console.log(`bit length: ${subPacketBitLength}`);
      currentIndex = currentIndex + 7 + 15;
    } else {
      //then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
      subPacketLength = parseInt(binary.slice(currentIndex + 7, currentIndex + 7 + 11).join(''), 2);
      console.log(`packet length: ${subPacketLength}`);
      currentIndex = currentIndex + 7 + 11;
    }
    
    var newIndex = currentIndex;
    var startingIndex = newIndex;
    console.log(`subPackets (${version}): starting at index: ${startingIndex}`);
    if (isNaN(subPacketBitLength)) { return 123412341234; }
    for (var i = 0; i < subPacketLength; i++) {
      newIndex = parsePacket(newIndex);
      if (newIndex == (startingIndex + subPacketBitLength)) {
        break;
      }
    }
    return newIndex;
  }
}