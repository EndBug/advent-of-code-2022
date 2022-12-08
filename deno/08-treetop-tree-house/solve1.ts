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

let visible = (rows + cols) * 2 - 4;

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (
      input[i][j] > Math.max(...input[i].slice(0, j)) ||
      input[i][j] > Math.max(...input[i].slice(j + 1)) ||
      input[i][j] > Math.max(...inputT[j].slice(0, i)) ||
      input[i][j] > Math.max(...inputT[j].slice(i + 1))
    )
      visible++;
  }
}

console.log(visible);
writeFileSync("./output1.txt", visible.toString());
