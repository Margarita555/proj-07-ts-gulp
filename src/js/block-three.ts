interface INode {
  value: number | INode;
  left: INode | null;
  right: INode | null;
  insert(num: number): void;
  search(num: number): null | number | ((num: number) => number | null);
  delete(num: number, currentNode: INode): INode;
}

class TreeNode implements INode {
  value: number | INode;
  left: INode | null;
  right: INode | null;

  constructor(num: number) {
    this.value = num;
    this.left = null;
    this.right = null;
  }

  insert(num: number) {
    if (!this.value) {
      this.value = num;
      return;
    }
    if (num < this.value && this.left) {
      this.left.insert(num);
    } else if (num < this.value && this.left === null) {
      this.left = new TreeNode(num);
      return;
    }
    if (num > this.value && this.right) {
      this.right.insert(num);
    } else if (num > this.value && this.right === null) {
      this.right = new TreeNode(num);
      return;
    }
  }

  search(num: number): null | number | ((num: number) => number | null) {
    if (this.value === null) {
      return null;
    }
    if (this.value === num) {
      return this.value;
    }
    if (num < this.value) {
      return this.left!.search(num);
    }
    return this.right!.search(num);
  }

  delete(num: number | INode, currentNode: INode | null): INode {
    let current: INode | null = currentNode || this;
    if (num < current.value) {
      current.left = this.delete(num, current.left);
      return current;
    } else if (num > current.value) {
      current.right = this.delete(num, current.right);
      return current;
    } else {
      if (current.left === null && current.right === null) {
        current = null;
        return;
      }
      if (current.left === null) {
        return current.right;
      }
      if (current.right === null) {
        return current.left;
      }
      let replacedNode: INode = current.right;
      while (replacedNode.left !== null) {
        replacedNode = replacedNode.left;
      }
      current.value = replacedNode.value;
      current.right = this.delete(replacedNode.value, current.right);
      return current;
    }
  }
}

/* ======================= Task 2 ==========================
 ???????????????? ???????????????????? ?????????? ???????????????????? ???????????????? (?????????? ?????????????? ?????????? ???????????? ????????????????????, ?????????? ??????????????: ??????????????????????, ??????????????)
 */
declare global {
  interface Array<T> {
    bubbleSort(callback: (itemFirst: T, itemSecond: T) => boolean): T[];
  }
}

Array.prototype.bubbleSort = function (callback) {
  let isFlag: boolean = typeof callback !== "function";
  for (let i: number = this.length - 1; i > 0; i--) {
    for (let j: number = 0; j < i; j++) {
      if (
        (callback && callback(this[j], this[j + 1])) ||
        (isFlag && this[j] > this[j + 1])
      ) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
};

declare global {
  interface Array<T> {
    selectionSort(callback: (itemFirst: T, itemSecond: T) => boolean): T[];
  }
}

Array.prototype.selectionSort = function (callback) {
  let isFlag: boolean = typeof callback !== "function";
  for (let i: number = 0; i < this.length - 1; i++) {
    let min: number = i;
    for (let j: number = 0; j < this.length; j++) {
      if (
        (callback && callback(this[j], this[i + 1])) ||
        (isFlag && this[j] > this[j + 1])
      ) {
        min = j;
        [this[i + 1], this[min]] = [this[min], this[i + 1]];
      }
    }
  }
  return this;
};
export {};
