"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function greeter(person) {
    return "Hello, " + person;
}
var student = /** @class */ (function () {
    function student(firstName, MiddleName, lastName) {
        this.firstName = firstName;
        this.MiddleName = MiddleName;
        this.lastName = lastName;
        this.fullName = firstName + MiddleName + lastName;
    }
    return student;
}());
function getPerson(person) {
    return person.firstName + person.lastName;
}
var my = { firstName: 'wang', lastName: 'chao' };
var user = [1, 2, 3];
var student1 = new student('wang', 'm', 'chao');
console.log(greeter('lanpang'));
console.log(getPerson(my));
console.log(student1);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["White"] = 2] = "White";
})(Color || (Color = {}));
;
var c = Color[0];
console.log(c);
var someVal = 'lan pang';
var valLength = someVal.length;
console.log(valLength);
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
function foo() {
    // okay to capture 'a'
    return a;
}
console.log(foo());
var a = 1;
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        console.log(i);
        for (var i_1 = 0; i_1 < currentRow.length; i_1++) { //用var声明的话 会影响上一层的i 导致上一层的i只走一次后i就变成了3
            sum += currentRow[i_1];
        }
    }
    return sum;
}
console.log(sumMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
function theCityThatAlwaysSleeps() {
    var getCity;
    if (true) {
        var city_1 = "Seattle";
        getCity = function () {
            return city_1;
        };
    }
    return getCity();
}
console.log(theCityThatAlwaysSleeps());
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = {
    size: 10,
    label: "Size 10 Object"
};
printLabel(myObj);
var classmate = /** @class */ (function () {
    function classmate(config) {
        this.config = config;
        console.log(config.name + '...' + config.age);
    }
    return classmate;
}());
var classmate1 = new classmate({
    name: 'LanPang',
    age: 18
});
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black", width: 1000 });
console.log(mySquare);
function createSquare1(config) {
    // ...
    return { color: 'red', area: 10000 };
}
var mySquare1 = createSquare1({ colour: "red", width: 100 });
console.log(mySquare1);
//可索引的类型
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, breed) {
        var _this = _super.call(this, name) || this;
        _this.breed = breed;
        if (breed) {
            _this.breed = breed;
        }
        return _this;
    }
    return Dog;
}(Animal));
function anis(config) {
    console.log(config);
}
anis({
    "dog": {
        name: "xiaopang"
    },
    0: {
        name: "pangpang",
    }
});
var Clock = /** @class */ (function () {
    function Clock(h, m) {
        var now = new Date;
        this.currentTime = now;
        this.setTime(now);
    }
    Clock.prototype.setTime = function (now) {
        this.currentTime = new Date();
    };
    return Clock;
}());
var clock = new Clock(12, 12);
var square = {};
// let square = {} as Square;
//两种声明都可以
square.color = "blue";
square.sideLength = 10;
console.log(square);
// let sut : Array<Person> = [];
var sut = {}; //定义一个sut对象，这个对象跟Person接口一样,有Person接口的name和age属性
sut.age = 18;
sut.name = 'ddd';
console.log(sut);
var Persons = /** @class */ (function () {
    function Persons(person) {
        console.log(person);
    }
    return Persons;
}());
var stu = []; //定义一个数组stu  数组中的每一项都是一个Person类
stu[0] = new Persons({
    firstName: 'lan',
    lastName: 'pang'
});
stu[1] = new Persons({
    firstName: 'lan',
    lastName: 'pang'
});
console.log(stu);
function getCounter() {
    var counter = function (start) {
        console.log(start);
    };
    counter.interval = 123;
    counter.reset = function () {
        console.log('reset');
    };
    return counter;
}
var cou = getCounter();
cou(10); //当用(10)调用cou是 cou是一个函数接口 执行<Counter>function (start: number) {}；
cou.reset(); //当用.reset()调用cou时，执行counter.reset = function () { }
cou.interval = 5.0; //当用.interval调用时，给cou下的interavl属性赋值
console.log(cou);
//真的没懂
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
function createClock(ctor, hour, minute) {
    console.log('---');
    console.log(ctor);
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
        this.tick();
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
        this.tick();
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
console.log(digital);
