import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

const rows = input.length,
  cols = input[0].length,
  inputT = input[0].map((_, j) => input.map((row) => row[j]));

let best = 1;

const dist = (v: number, arr: number[]) => {
  let d = 1;
  for (; d - 1 < arr.length - 1 && arr[d - 1] < v; d++);
  return d;
};

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    const curr =
      dist(input[i][j], inputT[j].slice(0, i).reverse()) * // up
      dist(input[i][j], input[i].slice(0, j).reverse()) * // left
      dist(input[i][j], inputT[j].slice(i + 1)) * // down
      dist(input[i][j], input[i].slice(j + 1)); // right

    best = Math.max(best, curr);
  }
}

console.log(best);
writeFileSync("./output2.txt", best.toString());
