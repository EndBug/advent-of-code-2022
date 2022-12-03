import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf-8").trim().split("\n");

const output = input.reduce((acc, rucksack) => {
  const first = rucksack.slice(0, rucksack.length / 2),
    second = rucksack.slice(rucksack.length / 2);

  const common = first.split("").find((l) => second.includes(l)) as string;

  return common == common.toLowerCase()
    ? acc + 1 + common.charCodeAt(0) - "a".charCodeAt(0)
    : acc + 27 + common.charCodeAt(0) - "A".charCodeAt(0);
}, 0);

console.log(output);
writeFileSync("./output1.txt", output.toString());
