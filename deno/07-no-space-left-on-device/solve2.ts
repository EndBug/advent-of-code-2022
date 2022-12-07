import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";
import path from "https://deno.land/std@0.167.0/node/path.ts";

const input = readFileSync("./input.txt", "utf-8").trim().split("\n");

const tree: Record<string, number> = { "/": 0 };
let cwd = "";

input.forEach((line) => {
  const words = line.split(" ");

  if (words[0] == "$") {
    if (words[1] == "cd") cwd = path.join(cwd, words[2]);
  } else if (words[0] == "dir") tree[path.join(cwd, words[1])] = 0;
  else {
    const size = Number(words[0]);
    tree["/"] += size;
    if (cwd != "/") tree[cwd] += size;

    cwd.split("").forEach((c, i, str) => {
      if (c == "/") tree[str.slice(0, i).join("")] += size;
    });
  }
});

const output = Object.entries(tree)
  .filter(([_, s]) => 70000000 - (tree["/"] - s) >= 30000000)
  .sort((a, b) => a[1] - b[1])[0][1];

console.log(output);
writeFileSync("./output2.txt", output.toString());
