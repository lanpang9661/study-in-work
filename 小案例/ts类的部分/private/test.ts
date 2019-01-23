class Person {
    private name: string;
    protected age: number;

    constructor( name:string, age: number ){
        this.name= name;
        this.age = age;
    }

    eat(things: string): number{
        console.log('i am eating '+ things + ' i am ' + this.age);
        return this.age;
    }
}

class Student extends Person {
    // private name = 'ddd';  //私有属性在子类中也是不能用的哦

    constructor( name: string, age: number ){
        super(name, age)
    }

    eat(things: string){
        super.eat(things)
        return this.age;
    }
}

class Man {
    private name: string;
    protected age: number;

    constructor( name:string, age: number ){
        this.name= name;
        this.age = age;
    }

    eat(things: string){
        console.log('i am eating '+ things);
    }
}

let p1 = new Person('LanPang',18);
let s1 = new Student('stu1',22);
let m1 = new Man('wangchao',22);

console.log(s1);
console.log(s1.eat('apple'));



p1 = s1;
// m1 = p1;
s1 = p1;
// s1 = m1;