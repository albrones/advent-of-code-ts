import { readFileSync } from "fs";
import * as R from "remeda";

const file = readFileSync("./input.txt", "utf8");
const lines = R.pipe(file, R.split("\n"), R.dropLast(1));

const [left, right] = lines
  .map((row) => {
    const [x, y] = row.split("  ");
    return [Number(x), Number(y)];
  })
  .map((list) => list.sort());

// Part1
const distanceBetween = [left, right].forEach(() =>
  Math.abs(Number(x) - Number(y))
);
//   sumBy(zip(left, right), ([x, y]) =>
//     Math.abs(Number(x) - Number(y)),
//   );

// Part2
const nbOccurences = R.sum(
  left.map((x) => right.filter((y) => x === y).length * x)
);
