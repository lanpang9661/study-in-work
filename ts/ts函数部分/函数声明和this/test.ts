function add (x: number, y: number): number {
    return x+y;
}

let myAdd: (x:number,y:number) => number = function (x: number, y: number): number {
    return x + y;
}

interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];

    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

enum Enmu {
    'lanpang' = 1,
    'pangzi',
    'xiong' = 2,
}

console.log(Enmu[2]);


window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
    
};

let x = (a: number) => ({name:'lanpang', age: 18})
let y = (a:number, b:string) => ({name: 'xiong'});

y = x

console.log(y);


interface StringValidator {
    isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: StringValidator; } = {};
console.log(validators);

validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(s => {
    for (let name in validators) {
        console.log( s + '' + (validators[name].isAcceptable(s) ? " matches " : " does not match ") + name);
    }
});