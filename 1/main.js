import { data } from "./data.js";

const [col1, col2] = data
  .split("\n")
  .map((row) => row.match(/(\d+)\s+(\d+)/))
  .map(([, n1, n2]) => [n1, n2].map(Number))
  .reduce(
    ([col1, col2], [n1, n2]) => [
      [...col1, n1],
      [...col2, n2],
    ],
    [[], []],
  )
  .map((col) => col.sort((x, y) => x - y))

const distances = [];

for (let i = 0; i < col1.length; i++) {
  distances.push(Math.abs(col1[i] - col2[i]));
}

console.log({ solution: distances.reduce((sum, num) => sum + num, 0) })
