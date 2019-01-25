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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    Greeter = __decorate([
        sealed
    ], Greeter);
    return Greeter;
}());
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    console.log(Object);
    console.log(constructor.prototype);
}
function Age(v) {
    return function (constructor) {
        var Person2 = /** @class */ (function (_super) {
            __extends(Person2, _super);
            function Person2() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = v;
                return _this;
            }
            return Person2;
        }(constructor));
        return Person2;
    };
}
function foot(n) {
    return function (constructor) {
        var Person3 = /** @class */ (function (_super) {
            __extends(Person3, _super);
            function Person3() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.foot = n;
                return _this;
            }
            return Person3;
        }(constructor));
        return Person3;
    };
}
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'lanpang';
    }
    Person = __decorate([
        Age(10),
        foot(2)
    ], Person);
    return Person;
}());
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = 'dog';
    }
    Animal = __decorate([
        foot(4),
        Age(20)
    ], Animal);
    return Animal;
}());
var P1 = new Person();
console.log(P1);
var D1 = new Animal();
console.log(D1);
//类装饰器 作用是给类增加某些属性
