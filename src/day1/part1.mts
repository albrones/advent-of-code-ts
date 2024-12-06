import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const sortedArrays = R.pipe(
  file,
  R.split('\n'),
  R.reduce(
    (acc, line) => {
      const [newA, newB] = line.split('   ').map(Number);
      console.log(acc);
      acc[0].push(newA);
      acc[1].push(newB);
      return acc;
    },
    [[], []]
  ),
  R.map((el) => el.sort())
);

const [left, right] = sortedArrays;

//Part1
const distanceBetween = R.pipe(
  R.zip(left, right),
  R.reduce((acc, [x, y], i) => {
    console.log(acc, x, y, i);
    return acc + Math.abs(x - y);
  }, 0)
);

// Part2
const nbOccurences = R.sum(left.map((x) => right.filter((y) => x === y).length * x));

console.log(nbOccurences);
