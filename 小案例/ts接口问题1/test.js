"use strict";
function fn(config) {
    return 'Hello i am ' + config.name + ', i am ' + config.age;
}
var obj = { size: 16, name: 'lanpang', age: 18 };
console.log(fn(obj));
// fn({
//     size: 18,
//     name: 'lanpang'
// })
// 问题1： 为什么用一个obj存{size: 16, name: 'lanpang',age: 18}然后把它当参数传给fn（obj）不会报错
// 而直接把{size: 16, name: 'lanpang',age: 18}当参数传给fn（{size: 16, name: 'lanpang',age: 18}）会报错
