const ROUNDS = 10000;

const input = Deno.readTextFileSync("example.txt").trim();

const monkeys = input.split("\n\n").map((monkey) => {
  const fields = monkey
    .split("\n")
    .slice(1)
    .map((line) => line.split(":")[1].trim());

  return {
    items: fields[0].split(", ").map(Number),
    op: (old: number) => {
      const [operator, _, ...rest] = fields[1]
        .slice("new = old ".length)
        .split("");
      const arg = rest.join("") == "old" ? old : Number(rest.join(""));

      return operator == "+" ? old + arg : old * arg;
    },
    test: (n: number) =>
      !(n % Number(fields[2].split(" ").slice(-1)[0]))
        ? Number(fields[3].split(" ").slice(-1)[0])
        : Number(fields[4].split(" ").slice(-1)[0]),

    inspects: 0,
  };
});

for (let r = 0; r < ROUNDS; r++) {
  for (const monkey of monkeys) {
    for (let item of monkey.items) {
      monkey.inspects++;
      item = monkey.op(item);
      monkeys[monkey.test(item)].items.push(item);
    }
    monkey.items = [];
  }

  if (!(r % 1000)) {
    console.log(`Round ${r}`);
    console.log(monkeys.map((m) => m.inspects).join("  "));
  }
}

const [m1, m2] = [...monkeys]
  .sort((a, b) => b.inspects - a.inspects)
  .slice(0, 2)
  .map((m) => m.inspects);
const output = m1 * m2;

console.log(output);
Deno.writeTextFileSync("output2.txt", output.toString());
