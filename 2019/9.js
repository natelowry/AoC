// --- Day 9: Sensor Boost ---
// You've just said goodbye to the rebooted rover and left Mars when you receive a faint distress signal coming from the asteroid belt. It must be the Ceres monitoring station!

// In order to lock on to the signal, you'll need to boost your sensors. The Elves send up the latest BOOST program - Basic Operation Of System Test.

// While BOOST (your puzzle input) is capable of boosting your sensors, for tenuous safety reasons, it refuses to do so until the computer it runs on passes some checks to demonstrate it is a complete Intcode computer.

// Your existing Intcode computer is missing one key feature: it needs support for parameters in relative mode.

// Parameters in mode 2, relative mode, behave very similarly to parameters in position mode: the parameter is interpreted as a position. Like position mode, parameters in relative mode can be read from or written to.

// The important difference is that relative mode parameters don't count from address 0. Instead, they count from a value called the relative base. The relative base starts at 0.

// The address a relative mode parameter refers to is itself plus the current relative base. When the relative base is 0, relative mode parameters and position mode parameters with the same value refer to the same address.

// For example, given a relative base of 50, a relative mode parameter of -7 refers to memory address 50 + -7 = 43.

// The relative base is modified with the relative base offset instruction:

// Opcode 9 adjusts the relative base by the value of its only parameter. The relative base increases (or decreases, if the value is negative) by the value of the parameter.
// For example, if the relative base is 2000, then after the instruction 109,19, the relative base would be 2019. If the next instruction were 204,-34, then the value at address 1985 would be output.

// Your Intcode computer will also need a few other capabilities:

// The computer's available memory should be much larger than the initial program. Memory beyond the initial program starts with the value 0 and can be read or written like any other memory. (It is invalid to try to access memory at a negative address, though.)
// The computer should have support for large numbers. Some instructions near the beginning of the BOOST program will verify this capability.
// Here are some example programs that use these features:

// 109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99 takes no input and produces a copy of itself as output.
// 1102,34915192,34915192,7,4,7,99,0 should output a 16-digit number.
// 104,1125899906842624,99 should output the large number in the middle.
// The BOOST program will ask for a single input; run it in test mode by providing it the value 1. It will perform a series of checks on each opcode, output any opcodes (and the associated parameter modes) that seem to be functioning incorrectly, and finally output a BOOST keycode.

// Once your Intcode computer is fully functional, the BOOST program should report no malfunctioning opcodes when run in test mode; it should only output a single value, the BOOST keycode. What BOOST keycode does it produce?

// To begin, get your puzzle input.

const input9a = [1102, 34463338, 34463338, 63, 1007, 63, 34463338, 63, 1005, 63, 53, 1101, 0, 3, 1000, 109, 988, 209, 12, 9, 1000, 209, 6, 209, 3, 203, 0, 1008, 1000, 1, 63, 1005, 63, 65, 1008, 1000, 2, 63, 1005, 63, 904, 1008, 1000, 0, 63, 1005, 63, 58, 4, 25, 104, 0, 99, 4, 0, 104, 0, 99, 4, 17, 104, 0, 99, 0, 0, 1102, 23, 1, 1004, 1102, 1, 26, 1000, 1102, 897, 1, 1028, 1101, 27, 0, 1012, 1102, 33, 1, 1001, 1102, 32, 1, 1007, 1101, 39, 0, 1005, 1101, 0, 29, 1018, 1101, 0, 0, 1020, 1101, 1, 0, 1021, 1101, 0, 21, 1002, 1102, 1, 35, 1014, 1101, 0, 36, 1009, 1102, 1, 38, 1006, 1102, 1, 251, 1024, 1102, 28, 1, 1017, 1102, 37, 1, 1008, 1102, 1, 329, 1026, 1102, 25, 1, 1011, 1102, 31, 1, 1013, 1102, 892, 1, 1029, 1102, 242, 1, 1025, 1102, 1, 881, 1022, 1102, 22, 1, 1003, 1102, 874, 1, 1023, 1101, 20, 0, 1016, 1101, 24, 0, 1019, 1101, 0, 326, 1027, 1101, 0, 34, 1015, 1102, 1, 30, 1010, 109, -2, 2102, 1, 7, 63, 1008, 63, 36, 63, 1005, 63, 205, 1001, 64, 1, 64, 1105, 1, 207, 4, 187, 1002, 64, 2, 64, 109, 9, 21101, 40, 0, 6, 1008, 1013, 43, 63, 1005, 63, 227, 1105, 1, 233, 4, 213, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 26, 2105, 1, -9, 4, 239, 1001, 64, 1, 64, 1106, 0, 251, 1002, 64, 2, 64, 109, -15, 1205, 2, 263, 1105, 1, 269, 4, 257, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -9, 2102, 1, 0, 63, 1008, 63, 36, 63, 1005, 63, 295, 4, 275, 1001, 64, 1, 64, 1106, 0, 295, 1002, 64, 2, 64, 109, -14, 1207, 10, 38, 63, 1005, 63, 311, 1105, 1, 317, 4, 301, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 28, 2106, 0, 4, 1106, 0, 335, 4, 323, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -8, 1206, 6, 351, 1001, 64, 1, 64, 1106, 0, 353, 4, 341, 1002, 64, 2, 64, 109, -1, 2107, 33, -7, 63, 1005, 63, 369, 1106, 0, 375, 4, 359, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -9, 2108, 26, -1, 63, 1005, 63, 395, 1001, 64, 1, 64, 1106, 0, 397, 4, 381, 1002, 64, 2, 64, 109, 3, 1201, -2, 0, 63, 1008, 63, 38, 63, 1005, 63, 419, 4, 403, 1105, 1, 423, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -13, 2101, 0, 9, 63, 1008, 63, 23, 63, 1005, 63, 445, 4, 429, 1105, 1, 449, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 11, 1208, 1, 32, 63, 1005, 63, 471, 4, 455, 1001, 64, 1, 64, 1106, 0, 471, 1002, 64, 2, 64, 109, 17, 21108, 41, 38, -4, 1005, 1019, 487, 1105, 1, 493, 4, 477, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 6, 1206, -9, 511, 4, 499, 1001, 64, 1, 64, 1106, 0, 511, 1002, 64, 2, 64, 109, -23, 21102, 42, 1, 8, 1008, 1014, 42, 63, 1005, 63, 533, 4, 517, 1106, 0, 537, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -3, 2107, 36, 5, 63, 1005, 63, 555, 4, 543, 1106, 0, 559, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -6, 1202, 5, 1, 63, 1008, 63, 21, 63, 1005, 63, 581, 4, 565, 1106, 0, 585, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 1, 1208, 10, 40, 63, 1005, 63, 605, 1001, 64, 1, 64, 1106, 0, 607, 4, 591, 1002, 64, 2, 64, 109, 7, 1201, 0, 0, 63, 1008, 63, 42, 63, 1005, 63, 631, 1001, 64, 1, 64, 1106, 0, 633, 4, 613, 1002, 64, 2, 64, 109, 1, 21107, 43, 42, 7, 1005, 1013, 649, 1105, 1, 655, 4, 639, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 7, 21108, 44, 44, 3, 1005, 1016, 677, 4, 661, 1001, 64, 1, 64, 1106, 0, 677, 1002, 64, 2, 64, 109, -7, 21102, 45, 1, 9, 1008, 1015, 44, 63, 1005, 63, 701, 1001, 64, 1, 64, 1106, 0, 703, 4, 683, 1002, 64, 2, 64, 109, 13, 21101, 46, 0, -7, 1008, 1012, 46, 63, 1005, 63, 729, 4, 709, 1001, 64, 1, 64, 1105, 1, 729, 1002, 64, 2, 64, 109, -13, 2101, 0, 3, 63, 1008, 63, 33, 63, 1005, 63, 753, 1001, 64, 1, 64, 1106, 0, 755, 4, 735, 1002, 64, 2, 64, 109, 14, 1205, 1, 773, 4, 761, 1001, 64, 1, 64, 1105, 1, 773, 1002, 64, 2, 64, 109, -23, 1202, 10, 1, 63, 1008, 63, 30, 63, 1005, 63, 797, 1001, 64, 1, 64, 1105, 1, 799, 4, 779, 1002, 64, 2, 64, 109, 13, 2108, 22, -7, 63, 1005, 63, 817, 4, 805, 1106, 0, 821, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, -11, 1207, 5, 24, 63, 1005, 63, 843, 4, 827, 1001, 64, 1, 64, 1105, 1, 843, 1002, 64, 2, 64, 109, 11, 21107, 47, 48, 7, 1005, 1017, 861, 4, 849, 1106, 0, 865, 1001, 64, 1, 64, 1002, 64, 2, 64, 109, 15, 2105, 1, -2, 1001, 64, 1, 64, 1106, 0, 883, 4, 871, 1002, 64, 2, 64, 109, 10, 2106, 0, -7, 4, 889, 1106, 0, 901, 1001, 64, 1, 64, 4, 64, 99, 21102, 1, 27, 1, 21102, 1, 915, 0, 1105, 1, 922, 21201, 1, 28510, 1, 204, 1, 99, 109, 3, 1207, -2, 3, 63, 1005, 63, 964, 21201, -2, -1, 1, 21102, 1, 942, 0, 1106, 0, 922, 22102, 1, 1, -1, 21201, -2, -3, 1, 21101, 957, 0, 0, 1106, 0, 922, 22201, 1, -1, -2, 1105, 1, 968, 21202, -2, 1, -2, 109, -3, 2106, 0, 0];

const input9 = BigInt(1);
let base9 = BigInt(0);

let index9 = BigInt(0);

let opcode9 = input9a[index9];

while (opcode9 !== 99) {
    const current = input9a[index9];
    //0 == position mode
    //1 == immediate mode
    //2 == relative mode
    // thirdparametermode secondparametermode firstparametermode 2digitopcode
    opcode9 = current % 100;
    const firstParamDigit = Math.floor(current / 100) % 10;
    const secondParamDigit = Math.floor(current / 1000) % 10;
    // const thirdParamDigit = Math.floor(current / 10000) % 10;
    // console.log(thirdParamDigit);

    let firstParam = BigInt(0);
    //console.log(firstParamDigit, secondParamDigit);
    switch (firstParamDigit) {
        case 0:
            firstParam = BigInt(input9a[input9a[Number(index9) + 1]] || 0);
            break;
        case 1:
            firstParam = BigInt(input9a[Number(index9) + 1] || 0);
            break;
        case 2:
            firstParam = BigInt(input9a[input9a[Number(index9) + 1] + base9] || 0);
            break;
    }

    let secondParam = BigInt(0);
    switch (secondParamDigit) {
        case 0:
            secondParam = BigInt(input9a[input9a[Number(index9) + 2]] || 0);
            break;
        case 1:
            secondParam = BigInt(input9a[Number(index9) + 2] || 0);
            break;
        case 2:
            secondParam = BigInt(input9a[input9a[Number(index9) + 2] + base9] || 0);
            break;
    }

    if (current === 1102) {
        console.log(current, firstParam, secondParam, input9a[Number(index9) + 3], BigInt(firstParam) * BigInt(secondParam));
    }
    //console.log(`opcode: ${opcode9}`);
    //console.log(`params: ${firstParam} ${secondParam}`);

    if (opcode9 === 1) {
        //Opcode 1 adds together numbers read from two positions and stores the result in a third position. The three integers immediately after the opcode tell you these three positions - the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.
        input9a[input9a[Number(index9) + 3]] = BigInt(firstParam) + BigInt(secondParam);
        index9 = Number(index9) + 4;
    } else if (opcode9 === 2) {
        //Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them. Again, the three integers after the opcode indicate where the inputs and outputs are, not their values.
        input9a[input9a[Number(index9) + 3]] = BigInt(firstParam) * BigInt(secondParam);
        console.log(current, firstParam, secondParam, input9a[Number(index9) + 3], BigInt(firstParam) * BigInt(secondParam), input9a[input9a[Number(index9) + 3]]);
        index9 = Number(index9) + 4;

    } else if (opcode9 === 3) {
        //Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. For example, the instruction 3,50 would take an input value and store it at address 50.
        input9a[input9a[Number(index9) + 1]] = input9;
        index9 = Number(index9) + 2;
    } else if (opcode9 === 4) {
        //Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would output the value at address 50.
        console.log(Number(firstParam));
        index9 = Number(index9) + 2;
    } else if (opcode9 === 5) {
        // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. 
        // Otherwise, it does nothing.
        if (firstParam !== 0) {
            index9 = secondParam;
        } else {
            index9 = Number(index9) + 3;
        }
    } else if (opcode9 === 6) {
        // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. 
        // Otherwise, it does nothing.
        if (firstParam === 0) {
            index9 = secondParam;
        } else {
            index9 = Number(index9) + 3;
        }
    } else if (opcode9 === 7) {
        // Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter.
        // Otherwise, it stores 0.
        if (firstParam < secondParam) {
            input9a[input9a[Number(index9) + 3]] = 1;
        } else {
            input9a[input9a[Number(index9) + 3]] = 0;
        }
        index9 = Number(index9) + 4;
    } else if (opcode9 === 8) {
        // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. 
        // Otherwise, it stores 0.
        if (firstParam === secondParam) {
            input9a[input9a[Number(index9) + 3]] = 1;
        } else {
            input9a[input9a[Number(index9) + 3]] = 0;
        }
        index9 = Number(index9) + 4;
    } else if (opcode9 === 9) {
        // Opcode 9 adjusts the relative base by the value of its only parameter. The relative base increases (or decreases, if the value is negative) by the value of the parameter.
        base9 = base9 + firstParam;
        index9 = Number(index9) + 2;
    }
}
