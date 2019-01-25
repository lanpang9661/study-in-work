class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    move(dis: number = 0){
        console.log(`${this.name} moved ${dis}m`);
        
    }
}

class Snake extends Animal {
    name: string;

    constructor(name: string) {
        super(name);
    }

    move(dis = 5){
        console.log('Snake');
        
        super.move(dis);
    }
}

class Horse extends Animal {
    name: string;
    
    constructor( name: string) {
        super(name);
    }

    move(dis = 49){
        console.log('Horse');
        
        super.move(dis);
    }
}


let dog = new Animal('dog')
let horse = new Horse('horse')
let snake = new Snake('snake')

dog.move(22);
horse.move(44);
snake.move(45);