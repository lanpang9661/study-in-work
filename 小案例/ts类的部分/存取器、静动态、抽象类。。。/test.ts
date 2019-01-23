const password: string = 'password';


class Person {
    private _name: string; //使用存取器获取和改变属性的话 首先要将这个属性设置为私有的并且在属性名前加_  

    get name(): string{  //获取name 注意 name前面没有_
        return this._name;
    }

    set name( newName: string ){  //设置name 前面没有_ 并且在set中可以进行一些逻辑上的处理 判断是否改变该属性值
        if(password && password == 'password'){ //如果密码对 那就改变 如果密码错误就走else
            this._name = newName;
        }else{
            console.log('密码错误');     
        }
    }
}

let p1 = new Person();

p1.name = 'lanpang';

console.log(p1.name);



// 抽象类
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type

// 实例部分和静态部分
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

console.log(typeof Greeter);

console.log(Greeter.standardGreeting);


let greeterMaker: typeof Greeter = Greeter;

greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());

//把类当作接口用 并没有搞清楚有什么卵用

class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};