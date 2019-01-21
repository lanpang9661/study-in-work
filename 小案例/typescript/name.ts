function greeter(person: string) {
    return "Hello, " + person;
}

class student {
    fullName: string;

    constructor (public firstName, public MiddleName, public lastName)  {
        this.fullName = firstName + MiddleName + lastName;
    }
}

interface person {
    firstName: string;
    lastName: string;
}

function getPerson( person: person ){
    return person.firstName + person.lastName;
}

var my = { firstName: 'wang', lastName: 'chao'}


var user: number[] = [1,2,3];

var student1 = new student('wang', 'm', 'chao');

console.log(greeter('lanpang'));
console.log(getPerson(my));
console.log(student1);


enum Color { 'Red', 'Black', 'White' };
let c: string = Color[0];

console.log(c);

let someVal: any = 'lan pang';

let valLength: number = (<string>someVal).length;

console.log(valLength);



// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误

function foo() {
    // okay to capture 'a'
    return a;
}

console.log(foo());
let a =1;


function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        console.log(i)
        for (let i = 0; i < currentRow.length; i++) { //用var声明的话 会影响上一层的i 导致上一层的i只走一次后i就变成了3
            sum += currentRow[i];
        }
    }

    return sum;
}

console.log( sumMatrix([[1,2,3],[4,5,6],[7,8,9]]) );


function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}

console.log(theCityThatAlwaysSleeps());

for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 1000 * i);
}