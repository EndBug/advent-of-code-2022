import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("input.txt", "utf8").trimEnd();

const stacks: string[][] = [];

// Populate stacks
const stackInput = input.split("\n\n")[0].split("\n").slice(0, -1);
for (let l = stackInput.length - 1; l >= 0; l--) {
  const line = stackInput[l];

  for (let i = 1; i < line.length; i += 4) {
    const s = (i - 1) / 4;
    if (l == stackInput.length - 1 && !stacks[s]) stacks.push([]);
    if (line[i] != " ") stacks[s].push(line[i]);
  }
}

// Execute moves
input
  .split("\n\n")[1]
  .trim()
  .split("\n")
  .forEach((line) => {
    const [n, from, to] = line
      .split(" ")
      .map(Number)
      .filter((e) => e);

    const c = stacks[from - 1].slice(-n);
    if (c.length) {
      stacks[from - 1] = stacks[from - 1].slice(0, -n);
      stacks[to - 1].push(...c);
    }
  });

const output = stacks.reduce((str, stack) => (str += stack.slice(-1)[0]), "");

console.log(output);
writeFileSync("./output1.txt", output);
