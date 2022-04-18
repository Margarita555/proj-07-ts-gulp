declare global {
  interface Function {
    myBind<T, R>(
      this: (this: IObject, ...args: T[]) => R,
      thisArg: IObject,
      ...args: T[]
    ): (...args: T[]) => R;
  }
}

interface IObject {
  [key: string]: any;
}

Function.prototype.myBind = function (context, ...rest) {
  let fn = this;
  const callback: string = Symbol() as unknown as string;
  return function (...args) {
    context[callback] = fn;
    const result = context[callback](...rest.concat(args));
    delete context[callback];
    return result;
  };
};

declare global {
  interface Function {
    myCall<T, R>(
      this: (this: IObject, ...args: T[]) => R | void,
      thisArg: IObject,
      ...args: T[]
    ): R | void;
  }
}

Function.prototype.myCall = function (context, ...args) {
  const callback: string = Symbol() as unknown as string;
  context[callback] = this;
  const result = context[callback](...args);
  delete context[callback];
  return result;
};

//  Написать свою реализацию функций для работы с массивами, которые являются аналогами следующих функций: map, filter, reduce, find, forEach.
//  */
declare global {
  interface Array<T> {
    myMap<Output>(
      callback: (arrItem: T, index?: number, arr?: T[]) => Output
    ): Output[];
  }
}

Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  let result = [];
  for (let i: number = 0; i < this.length; i++) {
    result[i] = callback(this[i], i, this);
  }
  return result;
};

declare global {
  interface Array<T> {
    myFilter(callback: (arrItem: T, i?: number, arr?: T[]) => boolean): T[];
  }
}

Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  const result = [];
  for (let i: number = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

declare global {
  interface Array<T> {
    myFind(
      callback: (arrItem: T, i?: number, arr?: T[]) => T | undefined
    ): T[] | undefined;
  }
}

Array.prototype.myFind = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  for (let i: number = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

declare global {
  interface Array<T> {
    myForEach(callback: (arrItem: T, index?: number, arr?: T[]) => void): void;
  }
}

Array.prototype.myForEach = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  for (let i: number = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

declare global {
  interface Array<T> {
    myReduce<U>(
      callback: (
        accumulator: U[] | number | IObject,
        arrItem: T,
        index?: number,
        arr?: T[]
      ) => U[] | number | IObject,
      acc?: U[] | number | IObject
    ): U[] | number | IObject;
  }
}

Array.prototype.myReduce = function (callback, acc) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }
  let accumulator = acc || 0;

  if (this.length === 0) {
    return accumulator;
  }
  for (let i: number = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
export {};
