interface arrFace {
    [index : number]: string
}

let myArr: arrFace;

myArr = [ 'man', 'woman' ]

console.log(myArr[0]);


class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: number]: Dog;
    [x: string]: Animal;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型不是索引类型的子类型
  }
