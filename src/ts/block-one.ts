declare global {
  interface String {
    mySplit(seperator?: string): string[];
  }
  interface Array<T> {
    myJoin(): string;
    myReverse(): T[];
    myPush(item: T): T[];
    mySlice(begin: number, end: number): T[];
  }
}

String.prototype.mySplit = function (seperator) {
  let str: string = this;
  let i: number = 0;
  let splitArray: string[] = [];

  while (i < str.length) {
    if (seperator && str[i] !== seperator) {
      let arrayItem = "";
      while (i < str.length && str[i] !== seperator) {
        arrayItem += str[i];
        i++;
      }
      splitArray.myPush(arrayItem);
    } else if (!seperator) {
      splitArray.myPush(str[i]);
    }
    i++;
  }
  return splitArray;
};

Array.prototype.myJoin = function () {
  let str: string = this;
  let newString: string = "";
  for (let i: number = 0; i < str.length; i++) {
    newString += str[i];
  }
  return newString;
};

Array.prototype.myReverse = function () {
  const arr: any[] = this;
  let newArr: any[] = [];
  for (let i: number = arr.length - 1; i >= 0; i--) {
    newArr.myPush(arr[i]);
  }
  return newArr;
};

Array.prototype.myPush = function (item) {
  const arr: any[] = this;
  const length: number = arr.length;
  arr[length] = item;
  return arr;
};

Array.prototype.mySlice = function (begin, end) {
  const arr: any[] = this;
  let newArr: any[] = [];
  for (let i: number = begin; i < end; i++) {
    newArr.myPush(arr[i]);
  }
  return newArr;
};
// ============ TASK 1 ==========================
// Написать функцию которая проверяет являются две строки анаграммой или нет

function checkIsAnogram(firstStr: string, secondStr: string): boolean {
  if (firstStr.length !== secondStr.length) {
    return false;
  }

  let firstWord: string = firstStr.toLowerCase();
  let secondWord: string = secondStr.toLowerCase();

  for (let i: number = 0; i < firstWord.length; i++) {
    if (firstWord.indexOf(secondWord[i]) !== -1) {
      let currentLetter: string = firstWord[i];
      let length1: number = 0;
      let length2: number = 0;

      for (let j: number = 0; j < firstWord.length; j++) {
        if (currentLetter === firstWord[j]) {
          length1++;
        }
        if (currentLetter === secondWord[j]) {
          length2++;
        }
      }

      if (length1 !== length2) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

// ============ TASK 3 ==========================
// Написать функцию которая вычисляет подсчет количество цифр в числе. Реализовать с помощью рекурсии.
function calculateLength(num: number): number {
  let amount: number = 0;

  while (num > 0) {
    amount++;
    num = Math.floor(num / 10);
  }
  return amount;
}

function calculateLengthByRecursion(num: number): number {
  if (num > 10) {
    return 1 + calculateLengthByRecursion(num / 10);
  }
  return 1;
}

// ============ TASK 4 ==========================
// Реализовать функцию которая проверяет, является ли строка палиндромом

function checkIsPalindrom(str: string): boolean {
  for (let i: number = 0; i < str.length; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
// // ============ TASK 5 ==========================
// // Написать функцию которая вычисляет подсчет уникальных слов в предложении

function calculateUniqueWords(string: string): number {
  const words: string[] = string.mySplit(" ");
  let count: number = 0;
  for (let i: number = 0; i < words.length; i++) {
    if (words.indexOf(words[i]) === i) {
      count++;
    }
  }
  return count;
}

// ============ TASK 6 ==========================
// Написать функцию которая вычисляет вхождение каждого слова в предложение

interface ICalculatedWords {
  [key: string]: number;
}

function calculateWords(sentence: string): {} {
  const words: string[] = sentence.mySplit(" ");

  const result: ICalculatedWords = {};
  for (let i: number = 0; i < words.length; i++) {
    if (!result.hasOwnProperty(words[i])) {
      result[words[i]] = 1;
    } else result[words[i]]++;
  }
  return result;
}

// // ============ TASK 7 ==========================
// // Вычислить периметр и площадь для прямоугольника, треугольника и круга.

abstract class Shape {
  constructor() {}

  abstract perimeter(): number;
  abstract square(): number;
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  perimeter(): number {
    return (this.width + this.height) * 2;
  }
  square(): number {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  height: number;
  base: number;
  side1: number;
  side2: number;

  constructor(height: number, base: number, side1: number, side2: number) {
    super();
    this.height = height;
    this.base = base;
    this.side1 = side1;
    this.side2 = side2;
  }

  perimeter(): number {
    return this.side1 + this.side2 + this.base;
  }
  square(): number {
    return (this.height * this.base) / 2;
  }
}

class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
  square(): number {
    return Math.PI * this.radius ** 2;
  }
}

// // ============ TASK 8 ==========================
// // Вычислить факториал числа. Реализовать с помощью рекурсии. Реализовать мемоизированную функцию вычисления факториала.

function calculateFactorial(num: number): number {
  let result: number = 1;
  for (let count: number = num; count > 1; count--) {
    result *= count;
  }
  return result;
}

function calculateFactorialByRecursion(num: number): number {
  if (num === 0) {
    return 1;
  }
  return num * calculateFactorialByRecursion(num - 1);
}

interface IMemo {
  [key: number]: number;
}

const factorialByMemo = (function (): (arg: number) => number {
  let memo: IMemo = {};
  return function factorial(num: number): number {
    if (num === 0) {
      return 1;
    }

    if (!memo[num]) {
      memo[num] = factorial(num - 1);
    }
    return num * memo[num];
  };
})();

// // ============ TASK 9 ==========================
// // Посчитать сумму всех элементов массива, только тех которые (Кратные двум, кратные трем, которые только положительные и нечетные), реализовать с помощью рекурсии для одномерного массива.

type MyCallback = (num: number, numeral?: number) => boolean;

function arrayElementsSum(arr: number[], callback: MyCallback): number {
  let sum: number = 0;
  for (let i: number = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      sum += arr[i];
    }
  }
  return sum;
}

function arrayElementsSumRecursion(arr: number[], callback: MyCallback, index: number): number {
  index = index || 0;

  if (arr.length <= index) {
    return 0;
  }
  if (callback(arr[index])) {
    return arr[index] + arrayElementsSumRecursion(arr, callback, ++index);
  }
  return arrayElementsSumRecursion(arr, callback, ++index);
}

// // ============ TASK 10 ==========================
// // Посчитать количество элементов массива которые (Нулевые, отрицательные, положительные, простые числа).

function countElements(arr: number[], callback: MyCallback): number {
  let amount: number = 0;

  for (const element of arr) {
    if (callback(element)) {
      amount++;
    }
  }
  return amount;
}

// // ============ TASK 11==========================
// // Написать функции которые преобразовывают число из десятичной системы счисления в двоичную и в обратную сторону. (Достаточно написать для целых положительных чисел).

function toBinary(num: number): string {
  let number: number = num;
  let result: string = "";
  while (number > 0) {
    result += number % 2;
    number = (number - (number % 2)) / 2;
  }
  return result.mySplit("").myReverse().myJoin();
}

function toDec(num: string): number {
  let result: number = 0;
  let arr: string[] = num.split("");

  for (let i: number = 0; i < arr.length; i += 1) {
    result += Number(arr[i]) * myMathPow(2, arr.length - 1 - i);
  }
  return result;
}

function myMathPow(base: number, pow: number): number {
  let result: number = base;
  if (pow === 0) {
    return 1;
  }
  for (let i: number = pow - 1; i > 0; i--) {
    result *= base;
  }
  return result;
}
// // ============ TASK 12==========================
// // Пункты 9 и 10 выполнить для двумерных массивов.

function sum(arr: number[][], callback: MyCallback): number {
  let sum: number = 0;

  for (let i: number = 0; i < arr.length; i++) {
    for (let j: number = 0; j < arr[i].length; j++) {
      if (callback(arr[i][j])) {
        sum += arr[i][j];
      }
    }
  }
  return sum;
}

function countElementsQuantity(arr: number[][], callback: MyCallback): number {
  let amount: number = 0;

  for (let i: number = 0; i < arr.length; i += 1) {
    for (let j: number = 0; j < arr[i].length; j += 1) {
      if (callback(arr[i][j])) {
        amount++;
      }
    }
  }
  return amount;
}

// // ============ TASK 13==========================
// // Посчитать сумму значений чисел от min до max (всех, только тех которые кратны 3, только положительные). Нарисовать блок схему. Реализовать также с помощью рекурсии.

function calcSumByMinMax(arr: number[], min: number, max: number, callback: MyCallback): number {
  let newArr: number[] = arr.mySlice(min - 1, max);
  let sum: number = 0;
  for (let i: number = 0; i < newArr.length; i += 1) {
    if (callback(newArr[i])) {
      sum += newArr[i];
    }
  }
  return sum;
}

function calcSumByMinMaxRecursion(arr: number[], min: number, max: number, callback: MyCallback): number {
  let newArr: number[] = arr.slice(min - 1, max);
  let i: number = 0;
  let total: number = (function sum(newArr: number[], i: number, callback: MyCallback): number {
    let index: number = i || 0;
    if (newArr.length <= index) {
      return 0;
    }
    if (callback(newArr[i])) {
      return newArr[index] + sum(newArr, ++index, callback);
    }
    return sum(newArr, ++index, callback);
  })(newArr, i, callback);

  return total;
}

// // ============ TASK 14==========================
// // Найти среднее значение всех элементов одномерного/двумерного массива (Среднее только тех которые четные и которые не четные).

function countArithmeticAverage(arr: number[], callback: MyCallback): number {
  let sum: number = 0;
  let len: number = 0;

  for (let i: number = 0; i < arr.length; i += 1) {
    if (callback(arr[i])) {
      sum += arr[i];
      len++;
    }
  }
  return Math.floor(sum / len);
}

function countDimensionalArrayArithmeticAverage(arr: number[][], callback: MyCallback): number {
  let sum: number = 0;
  let len: number = 0;

  for (let i: number = 0; i < arr.length; i++) {
    for (let j: number = 0; j < arr[i].length; j++) {
      if (callback(arr[i][j])) {
        sum += arr[i][j];
        len++;
      }
    }
  }

  return Math.floor(sum / len);
}

// // ============ TASK 15==========================
// // Транспонировать матрицу, сложить две матрицы.
function transposeMatrix(matrix: number[][]): number[][] {
  if (matrix.length === 0) {
    return [];
  }
  let newMatrix: number[][] = [];
  for (let i: number = 0; i < matrix[0].length; i++) {
    newMatrix[i] = [];
    for (let j: number = 0; j < matrix.length; j++) {
      newMatrix[i][j] = matrix[j][i];
    }
  }
  return newMatrix;
}

function addMatrixes(matrix1: number[][], matrix2: number[][]): number[][] {
  if (matrix1.length === 0 || matrix2.length === 0) {
    return [];
  }
  let newMatrix: number[][] = [];

  for (let i: number = 0; i < matrix1.length; i++) {
    newMatrix.myPush([]);
    for (let j: number = 0; j < matrix1.length; j++) {
      newMatrix[i].myPush(matrix1[i][j] + matrix2[i][j]);
    }
  }
  return newMatrix;
}

// // ============ TASK 16==========================
// // Удалить из двумерного массива строку в которой присутствует хотя бы один нулевой элемент. Для столбца аналогично реализовать.

function deleteString(matrix: number[][], value: number): number[][] {
  if (matrix.length === 0) {
    return [];
  }
  let index: number = 0;
  for (index = index; index < matrix.length; index++) {
    for (let j: number = 0; j < matrix[index].length; j++) {
      if (matrix[index][j] === value) {
        matrix.splice(index--, 1);
        break;
      }
    }
  }
  return matrix;
}

function deleteColumn(matrix: number[][], value: number): (number | number[])[] {
  if (matrix.length === 0) {
    return [];
  }

  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === value) {
        for (let k: number = 0; k < matrix.length; k++) {
          matrix[k].splice(j, 1);
        }
        j--;
      }
    }
    if (matrix[i].length === 0) {
      matrix.splice(i--, 1);
    }
  }
  return matrix;
}

// // ============ TASK 17==========================
// // Посчитать сумму/количество нулевых элементов/среднее значение элементов матрицы над и под главной диагональю и на главной диагональю.

function countSum(matrix: number[][], callback: MyCallback): number {
  let sum: number = 0;

  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < matrix[i].length; j++) {
      if (callback(j, i)) {
        sum += matrix[i][j];
      }
    }
  }
  return sum;
}

function countZeroElements(matrix: number[][], callback: MyCallback): number {
  let count: number = 0;
  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < matrix.length; j++) {
      if (callback(j, i) && matrix[i][j] === 0) {
        count += 1;
      }
    }
  }
  return count;
}

function countElementsAverageValue(matrix: number[][], callback: MyCallback): number {
  let sum: number = 0;
  let count: number = 0;

  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < matrix.length; j++) {
      if (callback(j, i)) {
        sum += matrix[i][j];
        count += 1;
      }
    }
  }
  return Math.floor(sum / count);
}

// // ============ TASK 18==========================
// // Создать итерируемый объект, который на каждой итерации возвращает следующее значение числа фибоначчи (Реализовать с помощью итератора и генератора). Реализовать мемоизированную функцию. Реализовать с помощью рекурсии.

interface IterateFibNum {
  min: number;
  current: number;
  [Symbol.iterator](): {
    previous: number;
    current: number;
    followed: number;
    next(): { value: number; done: boolean };
  };
}
const fibonacci: IterateFibNum = {
  min: 0,
  current: 1,

  [Symbol.iterator]() {
    return {
      previous: this.min,
      current: this.current,
      followed: this.current + this.min,
      next() {
        const result = {
          value: this.previous,
          done: false,
        };
        this.previous = this.current;
        this.current = this.followed;
        this.followed = this.previous + this.current;
        return result;
      },
    };
  },
};

interface IFibGenerator {
  previous: number;
  current: number;
  [Symbol.iterator](): Generator<number, void, number>;
}

const fibonacciGenerator: IFibGenerator = {
  previous: 0,
  current: 1,

  [Symbol.iterator]: function* () {
    while (true) {
      let temporaryCurrent: number = this.current;
      let temporaryPrevious: number = this.previous;
      this.current = this.current + this.previous;
      this.previous = temporaryCurrent;
      yield temporaryPrevious;
    }
  },
};

function fibonacciRecursion(num: number): number {
  if (num <= 1) {
    return num;
  }
  return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2);
}

interface IFibonacciMemo {
  [key: number]: number;
}

const fibonacciMemo = (function (): (arg: number) => number {
  let memo: IFibonacciMemo = {};

  return function fibonacci(num: number): number {
    if (memo[num]) {
      return memo[num];
    }

    if (num <= 1) {
      return 1;
    }

    memo[num] = fibonacci(num - 1) + fibonacci(num - 2);
    return memo[num];
  };
})();

// // ============ TASK 19 ==========================
// // Реализовать с помощью итератора и генератора светофор. При каждой следующей итерации мы должны получать следующий корректный цвет по логике светофора.
interface ITrafficLights {
  lights: string[];
  [Symbol.iterator](): {
    next(): { value: string; done: boolean };
  };
}

const trafficLights: ITrafficLights = {
  lights: ["red", "yellow", "green", "yellow"],
  [Symbol.iterator]() {
    let index: number = 0;
    return {
      lights: this.lights,
      next() {
        index++;
        const isLastLight: boolean = index >= this.lights.length;
        if (isLastLight) {
          index = 0;
        }
        return {
          value: this.lights[index],
          done: false,
        };
      },
    };
  },
};

interface ILightsGenerator {
  lights: string[];
  max: number;
  index: number;
  [Symbol.iterator](): Generator<string, void, string>;
}

const trafficLightsGenerator: ILightsGenerator = {
  lights: ["red", "yellow", "green", "yellow"],
  max: 10,
  index: 0,
  [Symbol.iterator]: function* () {
    for (let i: number = 0; i < this.max; i++) {
      let result: string = this.lights[this.index];
      this.index = this.index >= this.lights.length - 1 ? 0 : ++this.index;
      yield result;
    }
  },
};

// // ============ TASK 20 ==========================
// // Определить является ли число отрицательным или положительным без сравнения на больше/меньше нуля (побитово).
function checkIsPositive(num: number) {
  return (num >> 31) & 1;
}
// // Посчитать количество битов числа которые установлены в единицу и которые установлены в 0.

interface IBits {
  [key: number]: number;
}

function countBits(num: number) {
  const bits: IBits = {
    0: 0,
    1: 0,
  };
  let number: number = num;

  while (number > 0) {
    bits[number % 2]++;
    number = (number - (number % 2)) / 2;
  }
  bits[0] = 32 - bits[1];

  return bits;
}

// //  Написать свою реализацию для ~, двумя способами
function transformBitNotNumber(num: number): number {
  return num ^ -1;
}

function transformBitNotNumber2(num: number): number {
  let numeral: number = num;
  for (let i = 0; i < 32; i++) {
    numeral ^= 1 << i;
  }
  return numeral;
}

function transformBitNotNumber3(num: number): number {
  return -num - 1;
}

export {};
