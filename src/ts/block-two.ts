declare global {
  interface Array<T> {
    myMap<K>(callback: (arrItem: T, index?: number, arr?: T[]) => K): K[];
    myFilter(callback: (arrItem: T, i?: number, arr?: T[]) => boolean): T[];
    myFind(callback: (arrItem: T, i?: number, arr?: T[]) => T | undefined): T[] | undefined;
    myForEach(callback: (arrItem: T, index?: number, arr?: T[]) => void): void;
    myReduce<U>(
      callback: (accumulator: U | number, arrItem: T, index?: number, arr?: T[]) => U | number,
      acc?: U | number
    ): U | number;
  }
  interface Function {
    myBind<T, K>(this: Function, context: IObject, ...args: T[]): (...args: T[]) => K;
    myCall<T, K>(this: Function, context: IObject, ...args: T[]): K;
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

Function.prototype.myCall = function (context, ...args) {
  const callback: string = Symbol() as unknown as string;
  context[callback] = this;
  const result = context[callback](...args);
  delete context[callback];
  return result;
};

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

Array.prototype.myForEach = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  for (let i: number = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

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
