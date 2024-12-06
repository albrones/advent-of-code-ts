import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const sortedArrays = R.pipe(
  file,
  R.split('\n'),
  R.map((line) => line.split(' ').map(Number))
);

const isSafe = (el: number[], withTolerance: boolean = false) => {
  const operator = Math.sign(el[0] - el[1]);
  const expectedIntersectArrayLength = withTolerance ? el.length - 2 : el.length - 1;
  if (operator === 0) return false;
  return (
    R.pipe(
      el,
      R.map((cur, index) => el[0 + index] - el[1 + index]),
      (arr) => {
        console.log('0:', arr);
        return arr;
      },
      (arr) => R.dropLast(arr, 1),
      (arr) => {
        console.log('1:', arr);
        return arr;
      },
      R.filter((el) => Math.sign(el) === operator),
      (arr) => {
        console.log('2:', arr);
        return arr;
      },
      R.intersectionWith([1, 2, 3], (a, b) => Math.abs(a) === Math.abs(b)),
      (arr) => {
        console.log('3:', arr);
        return arr;
      }
    ).length >= expectedIntersectArrayLength
  );
};

// //Part1
const safeReportsNumber = R.pipe(
  sortedArrays,
  R.reduce((acc, cur, i) => {
    return isSafe(cur) ? acc + 1 : acc;
  }, 0)
);

console.log(safeReportsNumber);
