"use strict";
var Add = /** @class */ (function () {
    function Add() {
    }
    return Add;
}());
var myAdd = new Add();
var strAdd = new Add();
myAdd.add = function (x, y) {
    return x + y;
};
strAdd.add = function (x, y) {
    return x + y;
};
var strResult = strAdd.add('Hello,', 'LanPang');
var result = myAdd.add(12, 44);
console.log(result);
console.log(strResult);
