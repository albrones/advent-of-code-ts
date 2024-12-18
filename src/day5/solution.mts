import { readFileSync } from 'fs';
import * as R from 'remeda';

const file = readFileSync('./sample.txt', { encoding: 'utf8', flag: 'r' });
//split data by \n\n
const dataSplited = R.split(file, '\n\n');
// [0] = pageRequierements => split \n => el = "X|Y" = X printed before Y
const pageRequierements = R.pipe(
  dataSplited[0],
  R.split('\n'),
  R.map((el) => el.split('|'))
);

// [1] = pageListUpdates => split \n => el = "A,B,C,..."
const pageListUpdates = R.pipe(dataSplited[1], R.split('\n'));

// each pageListUpdates satisfy each pageRequierements (A is before in pageRequierements for each other of the list, then B is before each...  ) is correct
const getCorrectListOrIncorectMembers = (list: string) => {
  const splitList = R.split(list, ',');
  return R.pipe(
    splitList,
    R.reduce((acc: number[], cur, i) => {
      const formated = Number(cur);
      const notValid = pageRequierements.reduce((acc2: string[][], req: string[]) => {
        if (
          (formated === Number(req[0]) && acc.includes(Number(req[1])) && !splitList.includes(req[1])) ||
          (formated === Number(req[1]) && splitList.includes(req[0]) && !acc.includes(Number(req[0])))
        ) {
          return [...acc2, req];
        } else {
          return [...acc2];
        }
      }, []);
      // console.log(notValid);

      const newList = notValid.length > 0 ? acc : [...acc, formated];
      return newList;
    }, [])
  );
};
// getAllMiddleMemberList
// sumAllMiddleNumbers
//Part 1
// const sumAllMiddleNumbers = R.pipe(
//   pageListUpdates,
//   R.filter((el) => getCorrectListOrIncorectMembers(el).length === el.length),
//   R.map((el) => el.split(',')),
//   R.reduce((acc, cur, i) => {
//     const middle = (cur.length - 1) / 2;
//     console.log(cur, middle);
//     return acc + Number(cur[middle]);
//   }, 0)
// );
const reorderList = (list: number[], membersToOrder: number[]) => {
  // const membersToOrder
  // const [first, second] = pageRequierements
  let listFinal = list;
  R.pipe(
    membersToOrder,
    R.forEach((el) => {
      const couple = pageRequierements.find(([first, second]) => Number(first) === el);
      // console.log(membersToOrder);
      // listFinal = listFinal.filter((cur) => cur !== el);
      const indexToShift = listFinal.findIndex((cur) => cur === Number(couple[0]));
      console.log(indexToShift);

      listFinal.splice(indexToShift - 1, 0, el);
      const indexToRemove = listFinal.findLastIndex((cur) => cur === el);
      listFinal.splice(indexToRemove, 1);
    })
  );
  return listFinal;
};

//Part 2
const sumAllMiddleNumbers = R.pipe(
  pageListUpdates,
  R.reduce((acc, el, i) => {
    const result = getCorrectListOrIncorectMembers(el);
    console.log(result, el);
    const pageList = el.split(',').map((cur) => Number(cur));
    return result.length === pageList.length ? [...acc] : [...acc, reorderList(pageList, result)];
  }, []),
  // R.map((el) => el.split(',')),
  R.reduce((acc, cur, i) => {
    const middle = (cur.length - 1) / 2;
    console.log(cur, middle);
    return acc + Number(cur[middle]);
  }, 0)
);

console.log(sumAllMiddleNumbers);
