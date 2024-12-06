import { data } from "./data.js";

const numbers = data.split("\n").map((row) => row.split(/\s+/));

const col1 = numbers.map(([n1]) => n1).sort((x, y) => x - y);
const col2 = numbers.map(([_, n2]) => n2).sort((x, y) => x - y);

const distanceSum = col1
  .map((num, i) => Math.abs(num - col2[i]))
  .reduce((sum, num) => sum + num, 0);

console.log({ solution: distanceSum });
