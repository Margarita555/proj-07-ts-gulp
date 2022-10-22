class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value: T) {
    if (!this.value) {
      this.value = value;
      return;
    }
    if (value < this.value && this.left) {
      this.left.insert(value);
    } else if (value < this.value && this.left === null) {
      this.left = new TreeNode(value);
      return;
    }
    if (value > this.value && this.right) {
      this.right.insert(value);
    } else if (value > this.value && this.right === null) {
      this.right = new TreeNode(value);
      return;
    }
  }

  search(value: T): null | T | ((value: T) => T | null) {
    if (this.value === null) {
      return null;
    }
    if (this.value === value) {
      return this.value;
    }
    if (value < this.value) {
      return this.left!.search(value);
    }
    return this.right!.search(value);
  }

  delete(value: T | TreeNode<T>, currentNode: TreeNode<T> | null): TreeNode<T> {
    let current: TreeNode<T> | null = currentNode || this;
    if (value < current.value) {
      current.left = this.delete(value, current.left);
      return current;
    } else if (value > current.value) {
      current.right = this.delete(value, current.right);
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
      let replacedNode: TreeNode<T> = current.right;
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
 Написать сортировку двумя различными методами (Можно выбрать любые методы сортировки, самые простые: пузырьковая, выбором)
 */
declare global {
  interface Array<T> {
    bubbleSort(callback: (itemFirst: T, itemSecond: T) => boolean): T[];
    selectionSort(callback: (itemFirst: T, itemSecond: T) => boolean): T[];
  }
}

Array.prototype.bubbleSort = function (callback) {
  let isFlag: boolean = typeof callback !== "function";
  for (let i: number = this.length - 1; i > 0; i--) {
    for (let j: number = 0; j < i; j++) {
      if ((callback && callback(this[j], this[j + 1])) || (isFlag && this[j] > this[j + 1])) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
};

Array.prototype.selectionSort = function (callback) {
  let isFlag: boolean = typeof callback !== "function";
  for (let i: number = 0; i < this.length - 1; i++) {
    let min: number = i;
    for (let j: number = 0; j < this.length; j++) {
      if ((callback && callback(this[j], this[i + 1])) || (isFlag && this[j] > this[j + 1])) {
        min = j;
        [this[i + 1], this[min]] = [this[min], this[i + 1]];
      }
    }
  }
  return this;
};
export {};
