import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((str) => str.split(" "))
  .map((a) => [a[0], Number(a[1])] as ["R" | "L" | "U" | "D", number]);

type vector = [number, number];

const head: vector = [0, 0];
let tail: vector = [...head];
const log: vector[] = [[...tail]];

input.forEach((move) => {
  for (let i = 0; i < move[1]; i++) {
    const prevHead: vector = [...head];

    if (move[0] == "R") head[0]++;
    else if (move[0] == "L") head[0]--;
    else if (move[0] == "U") head[1]++;
    else if (move[0] == "D") head[1]--;

    const diff: vector = [head[0] - tail[0], head[1] - tail[1]];

    if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) tail = prevHead;

    log.push([...tail]);
  }
});

const output = log.filter(
  (pos, i, arr) => arr.findIndex((e) => e[0] == pos[0] && e[1] == pos[1]) == i
).length;

console.log(output);
writeFileSync("./output1.txt", output.toString());
