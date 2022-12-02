import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

enum M {
  rock = 1,
  paper,
  scissors,
}

const input = readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(
    (round) =>
      round.split(" ").map((l) => {
        switch (l) {
          case "A":
          case "X":
            return M.rock;
          case "B":
          case "Y":
            return M.paper;
          default:
            return M.scissors;
        }
      }) as [M, M]
  );

const roundOutcome = (opp: M, you: M) =>
  (opp == M.rock && you == M.paper) ||
  (opp == M.paper && you == M.scissors) ||
  (opp == M.scissors && you == M.rock)
    ? 6
    : opp == you
    ? 3
    : 0;

const result = input.reduce((acc, [o, y]) => acc + y + roundOutcome(o, y), 0);

console.log(result);
writeFileSync("./output1.txt", result.toString());
