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

const knots: vector[] = [];
for (let i = 0; i < 10; i++) knots.push([0, 0]);
const log: vector[] = [[...knots.slice(-1)[0]]];

input.forEach((move) => {
  for (let i = 0; i < move[1]; i++) {
    if (move[0] == "R") knots[0][0]++;
    else if (move[0] == "L") knots[0][0]--;
    else if (move[0] == "U") knots[0][1]++;
    else if (move[0] == "D") knots[0][1]--;

    for (let j = 1; j < knots.length; j++) {
      const diff: vector = [
        knots[j - 1][0] - knots[j][0],
        knots[j - 1][1] - knots[j][1],
      ];

      if (Math.abs(diff[0]) > 1 && Math.abs(diff[1]) == 0)
        knots[j][0] += Math.sign(diff[0]);
      else if (Math.abs(diff[0]) == 0 && Math.abs(diff[1]) > 1)
        knots[j][1] += Math.sign(diff[1]);
      else if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {
        knots[j][0] += Math.sign(diff[0]);
        knots[j][1] += Math.sign(diff[1]);
      }
    }

    log.push([...knots.slice(-1)[0]]);
  }
});

const output = log.filter(
  (pos, i, arr) => arr.findIndex((e) => e[0] == pos[0] && e[1] == pos[1]) == i
).length;

console.log(output);
writeFileSync("./output2.txt", output.toString());
