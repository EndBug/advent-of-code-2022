import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

const input = readFileSync("./input.txt", "utf-8").trim().split("\n");

let X = 1,
  output = "";

let cycle = 1,
  i = 0,
  wait = 0,
  toAdd = 0;

while (i < input.length || wait) {
  // During the cycle
  if (wait <= 0) {
    const instr = input[i] || "";

    if (instr == "noop") {
      toAdd = 0;
      wait = 1;
    } else if (instr.startsWith("add")) {
      toAdd = Number(instr.split(" ")[1]);
      wait = 2;
    }
  }

  output += X - 1 <= (cycle - 1) % 40 && (cycle - 1) % 40 <= X + 1 ? "#" : ".";
  if (!(cycle % 40)) output += "\n";

  // End of the cycle
  wait--;
  if (wait <= 0) {
    X += toAdd;
    i++;
  }
  cycle++;
}

console.log(output);
writeFileSync("./output2.txt", output.toString());
