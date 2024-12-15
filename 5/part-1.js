function splitAt(arr, index) {
  let before = arr.slice(0, index);
  let after = arr.slice(index + 1);

  return [before, after];
}

let raw = await Deno.readFile("./data.txt");
let data = new TextDecoder().decode(raw);

let [p1, p2] = data.split("\n\n");

let rules = p1
  .split("\n")
  .map((rule) => rule.split("|"))
  .reduce((res, [k, r]) => {
    return {
      ...res,
      [k]: [...(res?.[k] ?? []), r],
    };
  }, {});

let ordering = p2.split("\n").map((order) => order.split(","));

let goodOrders = [];
let goodOrdersSum = 0;

orderingLoop: for (let i = 0; i < ordering.length; i++) {
  let order = ordering[i];

  for (let j = 0; j < order.length; j++) {
    let number = order[j];
    let [befores, afters] = splitAt(order, j);

    for (let before of befores) {
      if (!rules[before]?.includes(number)) continue orderingLoop;
    }

    for (let after of afters) {
      if (!rules[number]?.includes(after)) continue orderingLoop;
    }
  }

  goodOrders.push(order);
}

for (let order of goodOrders) {
  let middle = order[(order.length - 1) / 2];
  goodOrdersSum += Number(middle);
}

console.log(goodOrdersSum);
