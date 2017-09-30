/******************************************************
 * 箭头函数中的this作用域取决于箭头函数定义的位置
 * 与普通函数唯一的区别是:
 * 在使用回调函数时,箭头函数中依然可以拿到当前的this对象
 */

// 将要购买的衣服数量为: 5
var count = 5;
// buyClothes函数定义的位置在Window的作用域
// 在这里定义箭头函数, buyClothes中的this将始终指向Window对象
var buyClothes = () => {
	console.log("我买了第几件衣服? => ", this.count); // 结果: 5
  // order.pay()中的第二个参数是一个函数
  // 此处以箭头函数的方式定义，以便函数内部this正确指向buyClothes函数中的this
  // 注意: order.pay()中在调用 cb()时改变了cb()的调用者为order自己而非Window
  // 否则由于cb的实参是由此处传入的, 相当于:
  // var cb = function(){ // do something.. }
  // order.pay(this.count, cb);
  // 因此cb的实际调用者应该是 当前作用域中的this
	order.pay(this.count, ( total )=>{
    // 若回调函数定义为 function(total){ // do something.. }
    // 则此处的this会在pay()中执行时被改变为order
    // 但由于定义为箭头函数, 因此会强制使用箭头函数定义位置的this
    console.log("this is =>", this); // 结果: Window
    // 数量: 5  总价: 1800
    console.log("衣服数量为[%d], 总价为: [%d]", this.count, total);
  });
  // printInfo()在定义时会继承外部作用域的this,
  // order定义的位置属于Window对象作用域,
  // 因此即便以order调用,this也不能拿到order对象本身
  order.printInfo();
  // printThanks()的定义为普通function函数,
  // 因此以order调用时内部this指向order对象本身
  // 同时, printThanks()中的setTimeout中的回调函数
  // 由于使用箭头函数定义,因此setTimeout内部绑定了外部的this,也就是order对象
  order.printThanks();
} // buyClothes END


// 初始值为 0
var order = {
  orderNo: "1234567",
  price: 360,
  count: 0,
  pay: function( count, cb ){
    // do something
    console.log("this? => ", this); // order对象
    // 绑定调用者为当前this(order对象), 混淆回调函数的this指向
    typeof cb === "function" && cb.bind(this)(this.price * count);
  },
  printInfo: ()=>{
    console.log(this); // 结果: Window对象
    console.log(this.orderNo); // 结果: undefined
  },
  printThanks: function(){
    setTimeout(()=>{
      console.log("感谢购买,您的订单号是: ", this.orderNo);
    }, 1000);
  }
};

buyClothes();
