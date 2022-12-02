import {
  readFileSync,
  writeFileSync,
} from "https://deno.land/std@0.167.0/node/fs.ts";

enum Move {
  rock = 1,
  paper,
  scissors,
}

enum Outcome {
  loose = 0,
  draw = 3,
  win = 6,
}

const inputMap = [
  {
    A: Move.rock,
    B: Move.paper,
    C: Move.scissors,
  },
  {
    X: Outcome.loose,
    Y: Outcome.draw,
    Z: Outcome.win,
  },
] as any;

const input = readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((round) => {
    const [m, o] = round.split(" ");
    return [inputMap[0][m], inputMap[1][o]] as [Move, Outcome];
  });

const moves = input.map(([move, out]) =>
  out == Outcome.draw
    ? move
    : out == Outcome.loose
    ? move == Move.rock
      ? Move.scissors
      : move == Move.paper
      ? Move.rock
      : Move.paper
    : move == Move.rock
    ? Move.paper
    : move == Move.paper
    ? Move.scissors
    : Move.rock
);

const result = input.reduce((acc, [_, out], i) => acc + out + moves[i], 0);

console.log(result);
writeFileSync("./output2.txt", result.toString());
