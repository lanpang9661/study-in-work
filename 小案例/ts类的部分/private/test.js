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
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.eat = function (things) {
        console.log('i am eating ' + things + ' i am ' + this.age);
        return this.age;
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // private name = 'ddd';  //私有属性在子类中也是不能用的哦
    function Student(name, age) {
        return _super.call(this, name, age) || this;
    }
    Student.prototype.eat = function (things) {
        _super.prototype.eat.call(this, things);
        return this.age;
    };
    return Student;
}(Person));
var Man = /** @class */ (function () {
    function Man(name, age) {
        this.name = name;
        this.age = age;
    }
    Man.prototype.eat = function (things) {
        console.log('i am eating ' + things);
    };
    return Man;
}());
var p1 = new Person('LanPang', 18);
var s1 = new Student('stu1', 22);
var m1 = new Man('wangchao', 22);
console.log(s1);
console.log(s1.eat('apple'));
p1 = s1;
// m1 = p1;
s1 = p1;
// s1 = m1;
