class Add<T> {
    num1: T;
    num2: T;

    add: ( x:T , y:T ) => T;

}

let myAdd = new Add<number>();
let strAdd = new Add<string>();

myAdd.add = function ( x, y){
    return x + y;
}

strAdd.add = function (x , y){
    return x + y;
}

let strResult = strAdd.add('Hello,','LanPang')

let result = myAdd.add(12,44)

console.log(result);
console.log(strResult);
