import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./sample.txt', { encoding: 'utf8', flag: 'r' });
const normal = 'XMAS';
const inverted = 'SAMX';
const matches = R.pipe(
  file,
  R.split('\n'),
  // R.join(''),
  R.reduce((acc, cur) => {
    const a = cur.match(normal)?.length;
    const b = cur.match(inverted)?.length;

    return acc + (a ?? 0) + (b ?? 0);
  }, 0)
);

console.log(matches);
