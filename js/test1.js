/**
 * 在Javascript中，this是一个需要深入理解的问题：
 * 一. this指向的对象不是当前定义的位置的对象，而是要看该this被谁调用，则指向谁;
 */

var count = 1;

// 1. 定义一个name变量，由于当前的作用域是浏览器环境，
// 因此在全局通过this调用该name变量时，this表示浏览器对象 window
var name = "阿拉拉布";
console.log("["+(count++)+"]: this 是 Window 对象 => ", this instanceof Window); // true



/******************************************************
 * 2. 函数updateName在全局调用，相当于调用方式为: window.updateName()
 * 因此this指向当前全局作用域，因此将全局作用域中的name值改变成了大雄
 */
var updateName = function(){
	this.name = "大雄";
}
// 等同于 window.updateName()
updateName();
console.log("["+(count++)+"]: updateName()之后全局name的值改变为  => ", this.name); // 大雄
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 3. pangHu对象中定义了name属性和printName方法
 */
var pangHu = {
	name: "胖虎",
	printName: function(who){
		console.log("["+(count++)+"]: "+who+"调用printName() => ", this.name);
	}
};
// 最终调用printName()方法的是pangHu对象,因此this指向pangHu对象的name属性
pangHu.printName("pangHu对象");	// 胖虎
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 4-5. newPrintName获取方法printName
 * newPrintName()虽然获取了 pangHu.printName()，但默认的调用者是window对象，因此执行结果是 大雄
 */
var newPrintName = pangHu.printName;
newPrintName("newPrintName");		// 大雄
pangHu.printName("oldPrintName");	// 胖虎
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 6-7. call()方法用于改变调用者，并且第一个参数必须接受一个object对象
 * 若第一个参数为null或者undefined时，默认改变调用者为全局对象
 * 除第一个参数之外(可以添加N个参数),表示将参数依次传递入被调用的方法。此处将一个字符串传递至printName方法的who参数
 */
pangHu.printName.call(this, "call(this)");	// 大雄
pangHu.printName.call(null, "call(null)");	// 大雄
console.log("--------------------阿布的分割线------------------");


/******************************************************
 * 8. 同理，定义一个小静的对象，可以用小静的对象调用胖虎的printName方法
 */
var xiaojing = {
	name: "小静"
};
pangHu.printName.call(xiaojing, "这是小静");
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 9. 通过bind(this)也可以改变当前方法的调用者
 * 改变之后的返回值是一个function,因此可以使用以下方式调用
 */
// pangHu.printName.bind(this)("bind(this)之后");
// 以下调用方式等同于上边这句
var fn = pangHu.printName.bind(this);	// 赋值给一个fn变量
console.log("方法调用bind()之后返回值类型为 => ", typeof fn); // 其结果为function
fn("bind(this)之后");		// 大雄



/******************************************************
 * 10. bind()操作不会改变原有对象属性,因此依然是原有对象胖虎在调用printName()
 */
pangHu.printName("bind()操作不会改变原有对象属性,因此");	// 胖虎
console.log("--------------------阿布的分割线------------------");



/******************************************************
 * 11. 小结：
 * 关于this的两种常见误解：
 * 1） 认为this是指向函数自身；
 * 2） 认为this是指向函数的作用域；
 * 在test2.js中会解释这样的误解
 */
