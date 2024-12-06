import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const regexMul = /mul\(\w+,\w+\)/g;
const regexNb = /\d+/g;
const matches = R.pipe(
  file,
  R.split('\n'),
  R.map((el) => {
    return el.match(regexMul);
  })
);

//Part 1
const calculation = R.pipe(
  matches,
  R.reduce((acc, cur, i) => {
    console.log(`${i}:`, cur);

    const currentMul = cur.map((el) => el.match(regexNb));
    if (currentMul?.length === 0) return acc;

    return (
      acc +
      currentMul.reduce((acc2, cur2, i2) => {
        return acc2 + Number(cur2[0]) * Number(cur2[1]);
      }, 0)
    );
  }, 0)
);
console.log(calculation);
