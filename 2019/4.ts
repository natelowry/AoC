// --- Day 4: Secure Container ---
// You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

// However, they do remember a few key facts about the password:

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
// Other than the range rule, the following are true:

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).
// How many different passwords within the range given in your puzzle input meet these criteria?

// Your puzzle answer was 1079.

// The first half of this puzzle is complete! It provides one gold star: *

// --- Part Two ---
// An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

// Given this additional criterion, but still ignoring the range rule, the following are now true:

// 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
// 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
// 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
// How many different passwords within the range given in your puzzle input meet all of the criteria?

// Your puzzle input is still 245318-765747.

let validPasswordsA4 = 0;
let validPasswordsB4 = 0;

for (var current4 = 245318; current4 <= 765747; current4++) {
    const digit1 = Math.floor(current4 / 100000) % 10;
    const digit2 = Math.floor(current4 / 10000) % 10;
    const digit3 = Math.floor(current4 / 1000) % 10;
    const digit4 = Math.floor(current4 / 100) % 10;
    const digit5 = Math.floor(current4 / 10) % 10;
    const digit6 = current4 % 10;

    // const digits = [digit1, digit2, digit3, digit4, digit5, digit6];

    let hasExactlyOnePair =
        (digit1 === digit2 && digit2 !== digit3)
        ||
        (digit1 !== digit2 && digit2 === digit3 && digit3 !== digit4)
        ||
        (digit2 !== digit3 && digit3 === digit4 && digit4 !== digit5)
        ||
        (digit3 !== digit4 && digit4 === digit5 && digit5 !== digit6)
        ||
        (digit4 !== digit5 && digit5 === digit6);

    let hasPairOrMore = digit1 === digit2 || digit2 === digit3 || digit3 === digit4 || digit4 === digit5 || digit5 === digit6;

    // const adjacentDigits = digits.reduce((previousValue, currentValue, currentIndex, arr) => previousValue + (currentIndex < 5 && currentValue === arr[currentIndex + 1] ? 1 : 0), 0);

    if (hasPairOrMore && digit1 <= digit2 && digit2 <= digit3 && digit3 <= digit4 && digit4 <= digit5 && digit5 <= digit6) {
        validPasswordsA4++;
    }

    if (hasExactlyOnePair && digit1 <= digit2 && digit2 <= digit3 && digit3 <= digit4 && digit4 <= digit5 && digit5 <= digit6) {
        validPasswordsB4++;
    }
}

console.log(validPasswordsA4);
console.log(validPasswordsB4);