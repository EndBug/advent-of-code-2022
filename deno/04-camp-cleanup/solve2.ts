import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((pair) => pair.split(",").map((range) => range.split("-").map(Number)));

const output = input.reduce(
  (acc, [r1, r2]) =>
    acc +
    Number(
      (r1[0] <= r2[1] && r2[0] <= r1[1]) || (r2[0] <= r1[1] && r1[0] <= r2[1])
    ),
  0
);

console.log(output);
writeFileSync("./output.txt", output.toString());
