interface infoFn {
    (name: string, age: number): string;
}

let myInfo: infoFn;

myInfo = function ( name: string, age: number ): string {
    return name + '' + age;
}

//下面两种也都可以 不一定非要变量名相同 ，也可以在赋值时不声明变量类型

/*
    myInfo = function ( myname: string, myage: number ): string {
        return myname + '' + myage;
    }

    myInfo = function ( myname, myage ) {
        return myname + '' + myage;
    }
*/

console.log(myInfo('LanPang', 18));
