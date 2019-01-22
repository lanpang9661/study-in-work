function greeter(person: string) {
    return "Hello, " + person;
}

class student {
    fullName: string;

    constructor (public firstName:string, public MiddleName:string, public lastName:string)  {
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

// for (let i = 0; i < 10 ; i++) {
//     setTimeout(function() {console.log(i); }, 1000 * i);
// }

interface LabelledValue {
    label: string;
  }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }
  
  let myObj = {
      size: 10, 
      label: "Size 10 Object"
    };
  printLabel(myObj);
  

  interface Person {
      name: string;
      age: number;
  }

  class classmate {
      constructor( public config: Person){
          console.log(config.name + '...' + config.age)
      }
  }

  var classmate1 = new classmate({
      name: 'LanPang',
      age: 18
  })

//可选属性
  interface SquareConfig {
    color?: string;
    width?: number;
  }
  
  function createSquare(config: SquareConfig): {color: string; area: number} {  //()内是函数参数的类型声明  ：{}里是函数返回值的类型声明
    let newSquare = {color: "white", area: 100};
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }
  
  let mySquare = createSquare({color: "black",width: 1000});

  console.log(mySquare)



//额外的属性检查

interface SquareConfig {
    color?: string;
    width?: number;
    [x: string]: any;
}

function createSquare1(config: SquareConfig): { color: string; area: number } {
    // ...

    return {color: 'red',area: 10000}
}

let mySquare1 = createSquare1({ colour: "red", width: 100 });

console.log(mySquare1)


//可索引的类型
class Animal {
    name: string;

    constructor(name:string){
        this.name = name
    }
}
class Dog extends Animal {

    constructor(name:string, public breed?: string) {
        super(name);
        if(breed){
            this.breed = breed;
        }
    }
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: string]: Animal;
    [x: number]: Dog;
}


function anis(config: NotOkay){
    console.log(config);
}

anis({
    "dog": {
        name: "xiaopang"
    },
    0: {
        name: "pangpang",
        // breed: "eawf" 明明设置了可以传入breed 为什么传入会报错？？？？？
    }
})


//类类型

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date):void;
}

class Clock implements ClockInterface {
    currentTime: Date;

    constructor(h: number, m: number) { 
        var now = new Date;
        this.currentTime = now;
        this.setTime(now);
     }

     setTime(now: Date) {
        this.currentTime = new Date()
    }
}

var clock = new Clock(12,12);




//扩展接口

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}


let square = <Square>{};

// let square = {} as Square;
//两种声明都可以

square.color = "blue";
square.sideLength = 10;

console.log(square);

// let sut : Array<Person> = [];
let sut = <Person>{}; //定义一个sut对象，这个对象跟Person接口一样,有Person接口的name和age属性
sut.age= 18;
sut.name = 'ddd';
console.log(sut)



class Persons {
    constructor(person: person){
        console.log(person);
        
    }
}

let stu: Array<Persons> = []; //定义一个数组stu  数组中的每一项都是一个Person类

stu[0] =  new Persons({
    firstName: 'lan',
    lastName: 'pang'
});

stu[1] =  new Persons({
    firstName: 'lan',
    lastName: 'pang'
})

console.log(stu);


//混合类型
interface Counter {
    (start: number): string;   //  (number) 是一个key  它的值string 是下面定义的函数<Counter>function (start: number) {}
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { 
        console.log(start);
    };
    counter.interval = 123;
    counter.reset = function () { 
        console.log('reset');
        
    };
    return counter;
}

let cou = getCounter();
cou(10);   //当用(10)调用cou是 cou是一个函数接口 执行<Counter>function (start: number) {}；
cou.reset(); //当用.reset()调用cou时，执行counter.reset = function () { }
cou.interval = 5.0;//当用.interval调用时，给cou下的interavl属性赋值

console.log(cou);




//真的没懂
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): string;
}

class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}

// class Location {
//     select() { }
// }



//类静态部分与实例部分的区别
//完全没懂

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface1;
}
interface ClockInterface1 {
    tick():void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface1 {
    console.log('---');
    
    console.log(ctor);
    
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface1 {
    constructor(h: number, m: number) { 
        this.tick()
    }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface1 {
    constructor(h: number, m: number) { 
        this.tick()
    }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);

// console.log(digital);
