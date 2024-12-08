/*

 We need to build a grid of array of array of characters from the input file.
	[
 		["X", "M", "A", "S"]
 		...
	]

 Since we know that "XMAS" starts with an X, we need some functions, that take a grid and the
 cell coordinates and returns true or false if they find XMAS in their direction:
 	1. countHorizontally(grid, i, j)
	    a. countHorizontallyForwards(grid, i, j)
	    b. countHorizontallyBackwards(grid, i, j)
	2. countVertically(grid, i, j)
	    a. countVerticallyForwards(grid, i, j)
	    b. countVerticallyBackwards(grid, i, j)
 	3. countDiagonally(grid, i, j)
	    a. countDiagonallySE(grid, i, j)
	    b. countDiagonallyNW(grid, i, j)
	    c. countDiagonallySW(grid, i, j)
	    d. countDiagonallyNE(grid, i, j)

 Algorithm:
 	- Loop over the grid (i, j)
 	- If we encounter an "X" we call the counts functions
 	- Each true back increments the total

*/
const XMAS = "XMAS";

let raw = await Deno.readFile("./data.txt");
let data = new TextDecoder().decode(raw);

let grid = data
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

let total = 0;

for (let i = 0; i < grid.length; i++) {
  let row = grid[i];

  for (let j = 0; j < row.length; j++) {
    let cell = grid[i][j];

    if (cell === "X") {
      total +=
        countHorizontally(grid, i, j) +
        countVertically(grid, i, j) +
        countDiagonally(grid, i, j);
    }
  }
}

console.log(total);

function countDiagonally(grid, i, j) {
  let count = 0;

  if (countSE(grid, i, j)) count++;
  if (countNW(grid, i, j)) count++;
  if (countSW(grid, i, j)) count++;
  if (countNE(grid, i, j)) count++;

  return count;
}

function countSE(grid, i, j) {
  let rowEnd = Math.min(i + 4, grid.length);
  let subset = "";

  for (let k = i; k < rowEnd; k++) {
    subset += grid[k][j];
    j++;
  }

  return subset === XMAS;
}

function countNW(grid, i, j) {
  let rowEnd = Math.max(i - 3, 0);
  let subset = "";

  for (let k = i; k >= rowEnd; k--) {
    subset += grid[k][j];
    j--;
  }

  return subset === XMAS;
}

function countSW(grid, i, j) {
  let rowEnd = Math.min(i + 4, grid.length);
  let subset = "";

  for (let k = i; k < rowEnd; k++) {
    subset += grid[k][j];
    j--;
  }

  return subset === XMAS;
}

function countNE(grid, i, j) {
  let rowEnd = Math.max(i - 3, 0);
  let subset = "";

  for (let k = i; k >= rowEnd; k--) {
    subset += grid[k][j];
    j++;
  }

  return subset === XMAS;
}

function countVertically(grid, i, j) {
  let count = 0;

  if (countNorth(grid, i, j)) count++;
  if (countSouth(grid, i, j)) count++;

  return count;
}

function countNorth(grid, i, j) {
  let rowEnd = Math.min(i + 4, grid.length);
  let subset = "";

  for (let k = i; k < rowEnd; k++) {
    subset += grid[k][j];
  }

  return subset === XMAS;
}

function countSouth(grid, i, j) {
  let rowEnd = Math.max(i - 3, 0);
  let subset = "";

  for (let k = i; k >= rowEnd; k--) {
    subset += grid[k][j];
  }

  return subset === XMAS;
}

function countHorizontally(grid, i, j) {
  let count = 0;

  if (countEast(grid, i, j)) count++;
  if (countWest(grid, i, j)) count++;

  return count;
}

function countEast(grid, i, j) {
  let row = grid[i];
  let subset = row.slice(j, j + 4).join("");

  return subset === XMAS;
}

function countWest(grid, i, j) {
  let row = grid[i];

  let subset = row
    .slice(j - 3, j + 1)
    .reverse()
    .join("");

  return subset === XMAS;
}
