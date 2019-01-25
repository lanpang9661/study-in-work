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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (dis) {
        if (dis === void 0) { dis = 0; }
        console.log(this.name + " moved " + dis + "m");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (dis) {
        if (dis === void 0) { dis = 5; }
        console.log('Snake');
        _super.prototype.move.call(this, dis);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (dis) {
        if (dis === void 0) { dis = 49; }
        console.log('Horse');
        _super.prototype.move.call(this, dis);
    };
    return Horse;
}(Animal));
var dog = new Animal('dog');
var horse = new Horse('horse');
var snake = new Snake('snake');
dog.move(22);
horse.move(44);
snake.move(45);
