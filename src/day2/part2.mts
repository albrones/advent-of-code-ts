import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const sortedArrays = R.pipe(
  file,
  R.split('\n'),
  R.map((line) => line.split(' ').map(Number))
);
const majorOperator = (arr: number[]) => {
  const positiveCount = arr.filter((num) => num >= 0).length;
  const negativeCount = arr.length - positiveCount;
  const majoritySign = positiveCount > negativeCount ? 1 : -1;

  return Math.sign(majoritySign);
};

const operator = (a: number, b: number) => (a > b ? -1 : 1);

const isSafe = (data: number[], withTolerance: boolean = false) => {
  // const operator = Math.sign(el[0] - el[1]);
  const expectedIntersectArrayLength = withTolerance ? data.length - 2 : data.length - 1;
  // if (operator === 0) return false;

  const diffArray = R.pipe(
    data,
    R.map((cur, index) => Math.abs(data[0 + index] - data[1 + index]) * operator(data[0 + index], data[1 + index])),
    (arr) => {
      console.log('0:', arr);
      return arr;
    },
    (arr) => R.dropLast(arr, 1)
  );

  return (
    R.pipe(
      diffArray,
      (arr) => {
        console.log('1:', arr);
        return arr;
      },
      R.intersectionWith([1, 2, 3], (a, b) => Math.abs(a) === Math.abs(b)),
      (arr) => {
        console.log('2:', arr);
        return arr;
      },
      R.filter((el) => Math.sign(el) === majorOperator(diffArray)),
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

// //Part2
const safeReportsNumberWithTolerance = R.pipe(
  sortedArrays,
  R.reduce((acc, cur, i) => {
    return isSafe(cur, true) ? acc + 1 : acc;
  }, 0)
);

console.log(safeReportsNumber);
