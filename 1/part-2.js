import { data } from "./data.js";

const numbers = data.split("\n").map((row) => row.split(/\s+/));

const col1 = numbers.map(([n1]) => n1);
const col2 = numbers.map(([_, n2]) => n2);

const countPerNum = col2.reduce(
  (acc, num) => ({
    ...acc,
    [num]: acc[num] ? acc[num] + 1 : 1,
  }),
  {},
);

const sum = col1
  .map((n) => Number(n) * (countPerNum[n] ?? 0))
  .reduce((total, n) => total + n, 0);

console.log({ solution: sum });
