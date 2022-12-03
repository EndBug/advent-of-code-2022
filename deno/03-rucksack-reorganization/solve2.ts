import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf-8").trim().split("\n");

let output = 0;
for (let i = 0; i < input.length; i += 3) {
  const common = input[i]
    .split("")
    .find(
      (l) => input[i + 1].includes(l) && input[i + 2].includes(l)
    ) as string;

  output +=
    common == common.toLowerCase()
      ? 1 + common.charCodeAt(0) - "a".charCodeAt(0)
      : 27 + common.charCodeAt(0) - "A".charCodeAt(0);
}

console.log(output);
writeFileSync("./output2.txt", output.toString());
