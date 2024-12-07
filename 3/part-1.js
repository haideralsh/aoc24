const raw = await Deno.readFile("./data.txt");
const data = new TextDecoder().decode(raw);

let res = [...data.matchAll(/mul\((\d+)\,(\d+)\)/g)]
  .map((match) => match.slice(1, 3).map(Number))
  .map(([x, y]) => x * y)
  .reduce((sum, num) => sum + num, 0);

console.log(res);
