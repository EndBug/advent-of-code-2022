import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

const rows = input.length,
  cols = input[0].length,
  inputT = input[0].map((_, j) => input.map((row) => row[j]));

let visible = (rows + cols) * 2 - 4;

const rowMaxs = input.map((r) => Math.max(...r)),
  colMaxs = inputT.map((c) => Math.max(...c));

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (
      input[i][j] == rowMaxs[i] &&
      input[i][j] == colMaxs[j] &&
      input[i].filter((e) => e == input[i][j]).length == 1 &&
      inputT[j].filter((e) => e == input[i][j]).length == 1
    )
      visible++;
  }
}

console.log(visible);
writeFileSync("./output1.txt", visible.toString());
