import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("input.txt", "utf8").trim();

const result = input
  .split("\n\n")
  .map((group) =>
    group
      .split("\n")
      .map(Number)
      .reduce((p, c) => p + c, 0)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((p, c) => p + c);

console.log(result);
writeFileSync("./output.txt", result.toString());
