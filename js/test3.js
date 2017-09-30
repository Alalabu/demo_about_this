//"use strict";
/**
 * 误解释疑2: 
 * 注意: 在Javascript中，this并非指向函数的作用域
 */

/******************************************************
 * 1. father()是由window对象来调用的，
 * 因此father()中对于 this.son() 的引用也相当于 window对象在引用
 * son()中打印 this.eyes 的值时，由于window对象中并没有 eyes 变量的定义，因此结果为undefined
 */

function father(){
	var eyes = "beautiful";
	// console.log(this instanceof Window);  // 结果: true
	this.son();
}

function son(){
	console.log("My eyes => ", this.eyes);
}

// var eyes = "大熊猫的眼睛"; // 若全局范围(window对象作用域范围)拥有eyes变量，则会被son() 引用

father();	// 结果: My eyes => undefined
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 2. 上一段代码的问题还不止一处
 * 如果我们仅仅是改变father()方法的调用者，将会出现对于 son()方法的引用异常
 * 原因很简单: son() 并不是father()函数内部定义的方法
 */

// father.call(father); // this.son is not a function
// console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 3. 解决上述问题的方法就是为father定义son属性,并且赋值为当前全局(window对象)的son()方法
 * 但此时还有一个问题，函数作用域内的声明变量不能作为函数的属性通过正确的this进行引用
 * 因此还需要首先为father函数对象添加 eyes 属性
 */
father.son = this.son;
father.eyes = "最美丽!";
father.call(father);






















