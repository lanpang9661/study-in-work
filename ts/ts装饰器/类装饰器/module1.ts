@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

function sealed(constructor: Function) {
    
    Object.seal(constructor);
    Object.seal(constructor.prototype);

    console.log(Object);
    console.log(constructor.prototype);
    

}



function Age(v: number){
    return function< T extends {new(...args : any[]) : {}} > ( constructor: T ): T {
        class Person2 extends constructor {
            age: number = v;
        }
    
        return Person2;
    }
}

function foot(n: number){

    return function <T extends {new (...args : any[]): {}}> (constructor: T): T {
        class Person3 extends constructor {
            foot: number = n;
        }

        return Person3;
    }

}

@Age(10)
@foot(2)
class Person {
    name: string = 'lanpang'
}

@foot(4)
@Age(20)
class Animal {
    name: string = 'dog'
}


let P1 = new Person();
console.log(P1);

let D1 = new Animal();
console.log(D1);


//类装饰器 作用是给类增加某些属性