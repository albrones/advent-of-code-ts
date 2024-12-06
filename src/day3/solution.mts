import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const regexMul = /mul\(\w+,\w+\)/g;
const regexDontDo = /don't\(\).*?(do\(\)|$)/g;
const regexNb = /\d+/g;
const matches = R.pipe(
  file,
  R.split('\n'),
  R.join(''),
  (string) => string.replace(regexDontDo, ''),
  (string) => string.match(regexMul)
);

//Part 1
const calculation = R.pipe(
  matches,
  R.reduce((acc, cur, i) => {
    const currentMul = cur.match(regexNb);
    if (currentMul?.length === 0) return acc;

    return acc + Number(currentMul[0]) * Number(currentMul[1]);
  }, 0)
);
console.log(calculation);
