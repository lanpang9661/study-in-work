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
    createCardPicker: function () {
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            console.log(this);
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
// alert("card: " + pickedCard.card + " of " + pickedCard.suit);
