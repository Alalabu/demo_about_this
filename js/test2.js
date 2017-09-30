//"use strict";
/**
 * 误解释疑1: 
 * 注意: 在Javascript中，this并非指向函数自身
 */

/******************************************************
 * 1. 定义一个买衣服的函数, 每次买完衣服, count++
 * 函数中的this并未指向buyClothes定义的count属性
 * 因此购买5次衣服的过程中，第一次this.count的值为undefined，
 * 第二次之后对undefined进行 ++ 操作，因此结果为NaN
 */
function buyClothes(){
	console.log("我买了第几件衣服? => ", this.count);
	this.count++;
}
// 初始值为 0
buyClothes.count = 0;
// 买5次衣服
for(var i=0; i<5; i++){
	buyClothes();	// 结果: undefined, NaN, NaN, NaN, NaN
}
// 打印 buyClothes 的count属性
console.log("买衣服的次数为 => ", buyClothes.count);	// 结果: 0
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 2. 上一个例子中，由于this的指向是由于调用他的角色而定的
 * 而for循环中的 buyClothes() 实际的调用者是window对象，而window并没有count属性，因此取值为undefined
 * 需要得到正确的结果，需要明确this的调用者是谁
 */
// 继续 买5次衣服
for(var i=0; i<5; i++){
	// call函数确保buyClothes()方法的调用者是buyClothes(函数)对象本身
	buyClothes.call(buyClothes);	// 结果: 0-4
}
// 打印 buyClothes 的count属性
console.log("买衣服的次数为 => ", buyClothes.count); // 结果: 5
console.log("--------------------阿布的分割线------------------");


























