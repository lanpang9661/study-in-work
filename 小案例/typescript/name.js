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
        this.currentTime = new Date();
        console.log(this.currentTime);
    }
    return Clock;
}());
var clock = new Clock(12, 12);
