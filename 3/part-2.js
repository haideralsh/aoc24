const raw = await Deno.readFile("./data.txt");
const data = new TextDecoder().decode(raw);

let instructions = data
  .match(/(do\(\))|(don\'t\(\))|(mul\(\d+,\d+\))/g)
  .flatMap((matched) => matched.startsWith("mul") ? [...matched.matchAll(/(\d+),(\d+)/g)].map(captured => captured.slice(1,3).map(Number)) : matched)

let can_do = true;
let sums = [];

for (let instruction of instructions) {
  if (typeof instruction === "string") {
    if (instruction === "don't()") can_do = false;
    if (instruction == "do()") can_do = true;

    continue;
  }

  if (!can_do) continue;

  let [x, y] = instruction;
  sums.push(x * y);
}

console.log(sums.reduce((sum, num) => sum + num, 0));
