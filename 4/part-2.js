/*

  For this part we need to find any 2 opposite diagonals of the following patterns intersecting:

  1.  M
        A
          S

  2.  S
        A
          M

  3.      S
        A
      M

  4.      M
        A
      S


  So we need to start at in the middle with the "A", if found, we check what's around it
*/

const MAS = "MAS";

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

    if (cell === "A") {
      if (
        ((grid[i - 1]?.[j - 1] === "M" && grid[i + 1]?.[j + 1] === "S") ||
          (grid[i - 1]?.[j - 1] === "S" && grid[i + 1]?.[j + 1] === "M")) &&
        ((grid[i - 1]?.[j + 1] === "S" && grid[i + 1]?.[j - 1] === "M") ||
          (grid[i - 1]?.[j + 1] === "M" && grid[i + 1]?.[j - 1] === "S"))
      ) {
        total++;
      }
    }
  }
}

console.log(total);
