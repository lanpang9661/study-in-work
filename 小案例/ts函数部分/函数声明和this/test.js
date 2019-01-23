"use strict";
function add(x, y) {
    return x + y;
}
var myAdd = function (x, y) {
    return x + y;
};
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
var Enmu;
(function (Enmu) {
    Enmu[Enmu["lanpang"] = 1] = "lanpang";
    Enmu[Enmu["pangzi"] = 2] = "pangzi";
    Enmu[Enmu["xiong"] = 2] = "xiong";
})(Enmu || (Enmu = {}));
console.log(Enmu[2]);
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button); //<- Error
};
var x = function (a) { return ({ name: 'lanpang', age: 18 }); };
var y = function (a, b) { return ({ name: 'xiong' }); };
y = x;
console.log(y);
var lettersRegexp = /^[A-Za-z]+$/;
var numberRegexp = /^[0-9]+$/;
var LettersOnlyValidator = /** @class */ (function () {
    function LettersOnlyValidator() {
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        return lettersRegexp.test(s);
    };
    return LettersOnlyValidator;
}());
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
console.log(validators);
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(function (s) {
    for (var name_1 in validators) {
        console.log(s + '' + (validators[name_1].isAcceptable(s) ? " matches " : " does not match ") + name_1);
    }
});
