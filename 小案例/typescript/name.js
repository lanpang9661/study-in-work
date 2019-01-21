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
var _loop_1 = function (i) {
    setTimeout(function () { console.log(i); }, 1000 * i);
};
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
