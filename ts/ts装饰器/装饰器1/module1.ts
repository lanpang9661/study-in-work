function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @g()
    @f()

    ddd(){
        console.log('ddd');
        
    }


    method() {
        console.log('method');
    }

    constructor() {
        console.log(1);
        
    }

    name: 'dflk';
    
}