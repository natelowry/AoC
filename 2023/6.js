var input = `Time:        44     82     69     81
Distance:   202   1076   1138   1458`;

var races = [
  {
    time: 44,
    distance: 202,
  },
  {
    time: 82,
    distance: 1076,
  },
  {
    time: 69,
    distance: 1138,
  },
  {
    time: 81,
    distance: 1458,
  },
];

if (false) {
  races = [
    {
      time: 7,
      distance: 9,
    },
    {
      time: 15,
      distance: 40,
    },
    {
      time: 30,
      distance: 200,
    },
  ];
}

//use this for b \/\/
//races = [{ time: 44826981, distance: 202107611381458 }];

var winners = [];

for (let currentRaceNumber = 0; currentRaceNumber < races.length; currentRaceNumber++) {
  let currentRace = races[currentRaceNumber];
  winners[currentRaceNumber] = [];
  for (let pressTime = 0; pressTime < currentRace.time; pressTime++) {
    var speed = pressTime;
    var timeLeft = currentRace.time - pressTime;
    var distance = speed * timeLeft;
    if (distance > currentRace.distance) {
      winners[currentRaceNumber].push(pressTime);
    }
  }
}

//console.log(winners);
console.log(`answer a: ${winners.map((x) => x.length).reduce((prev, curr) => prev * curr)}`);
