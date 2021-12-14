// AOC1a
document.body.innerText.trim().split('\n').map(x => parseInt(x, 10)).reduce((prev, cur, idx, arr) => prev + ((cur > arr[idx - 1]) ? 1 : 0), 0)

// AOC1b
document.body.innerText.trim().split('\n').map(x => parseInt(x, 10)).map((cur, idx, arr) => idx > 1 ? cur + arr[idx-1] + arr[idx-2] : 0).reduce((prev, cur, idx, arr) => prev + (idx > 2 && (cur > arr[idx - 1]) ? 1 : 0), 0)