/**
 * 箭头函数中的this作用域取决于箭头函数定义的位置
 * 与普通函数唯一的区别是:
 * 在使用回调函数时,箭头函数中依然可以拿到当前的this对象
 * 相当于之前我们习惯的 var that = this;用法
 */
var name = "樱木花道";

var obj = {
  name: "坂田银时"
};
// 定义时得到了外层的this并绑定至函数内部
var showName1 = () => this.name;
// 普通函数沿用this绑定规则，this指向调用者
var showName2 = function(){
  return this.name;
}
// 箭头函数方式定义的函数,this已被绑定为定义时的this,无法变换为别的调用者
console.log( showName1.call(obj) );
// 普通函数依照调用者来确定内部的this指向
console.log( showName2.call(obj) );

/******************************************************
 * 误区:
 * 对象中的属性的箭头函数是指向谁?
 * 当前对象处于Window作用域中，因此给that属性赋值得到的也是Window对象。
 * 箭头函数绑定了当前定义作用域内的this，并继承给了函数内部。
 */

var obj2 = {
  name: "神乐",
  printName: () => {
    console.log(this.name);
  },
  that: this
}
obj2.printName(); // 樱木花道
console.log( obj2.that ); // Window对象
