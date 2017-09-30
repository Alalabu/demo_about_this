## JS中的this ##

##### test1.js : 关于this的基本解释和常见用法

1. 在基于浏览器的应用中，若this不存在于任何函数中，则默认指向window对象;


 ``` javascript
	console.log(this instanceof Window); // true
 ```


2. 浏览器作用域中调用变量或函数时,this通常指向window对象;

 ``` javascript
	var name = "阿拉拉布";
	var updateName = function(){
		this.name = "大雄";
	}
	updateName(); // 相当于: window.updataName()
	console.log(this.name); // 结果: 大雄
 ```
3. this的指向取决于this存在的位置被谁所调用，而非在哪定义；
 ``` javascript
	var pangHu = {
		name: "胖虎",
		printName: function(who){
			console.log(who+"调用printName() => ", this.name);
		}
	};
	// 代码可以认为是:window.pangHu.printName()
	// 最终调用printName()方法的是pangHu对象,
	// 因此this指向pangHu对象的name属性
	pangHu.printName("pangHu对象");	// 结果: 胖虎
 ```
5. newPrintName获取方法printName，newPrintName()虽然获取了 pangHu.printName()，但默认的调用者是window对象，因此执行结果是:大雄
 ``` javascript
	var newPrintName = pangHu.printName;
	newPrintName("newPrintName");	// 结果: 大雄
	pangHu.printName("oldPrintName");	// 结果: 胖虎
 ```
6. call()和apply()都用于改变方法的调用者
 ``` javascript
	// call()方法用于改变调用者，并且第一个参数必须接受一个object对象
	// 若第一个参数为null或者undefined时，默认改变调用者为全局对象
	// 除第一个参数之外(可以添加N个参数),表示将参数依次传递入被调用的
	// 方法。此处将一个字符串传递至printName方法的who参数
	pangHu.printName.call(this, "call->this");	// 结果: 大雄
	pangHu.printName.call(null, "call->null");	// 结果: 大雄
 ```
7. 同理，定义一个小静的对象，可以用小静的对象调用胖虎的printName方法
 ``` javascript
	var xiaojing = {
		name: "小静"
	};
	pangHu.printName.call(xiaojing, "这是小静");	// 结果: 小静
 ```
8. 通过bind(this)也可以改变当前方法的调用者
 ``` javascript
	// pangHu.printName.bind(this)("bind(this)之后");
	// 以下调用方式等同于上边这句
	var fn = pangHu.printName.bind(this);	// 赋值给一个fn变量
	console.log("调用bind()之后返回值类型 => ", typeof fn); // 其结果为function
	fn("bind(this)之后");		// 结果: 大雄
 ```

***
> 以下是在this的使用过程中，我们常见的两个误解:
> 1. 认为this是指向函数自身；
> 2. 认为this是指向函数的作用域；
***


##### test2.js : 释疑1———this并非指向函数自身

1. 通过以下Demo可以发现this的指向并非是定义了this的函数本身;
 ``` javascript
	/**
	 * 定义一个买衣服的函数, 每次买完衣服, count++
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
 ```
2. 以上栗子中，for循环内buyClothes()的调用者是window。通过声明调用者为自身，可以避免问题的产生；

 ``` javascript
	/**
	 * 2. 上一个例子中，由于this的指向是由于调用他的角色而定的
	 * 而for循环中的 buyClothes() 实际的调用者是window对象，而window并没有count属性，因此取值为undefined
	 * 需要得到正确的结果，需要明确this的调用者是谁
	 */
	// 继续 买5次衣服
	for(var i=0; i<5; i++){
		// call函数确保buyClothes()方法的
		// 调用者是buyClothes(函数)对象本身
		buyClothes.call(buyClothes);	// 结果: 0-4
	}
	// 打印 buyClothes 的count属性
	console.log("买衣服的次数为 => ", buyClothes.count); // 结果: 5
 ```

***

##### test3.js : 释疑2———this并非指向他的作用域

1. this跟他在哪定义无关
 ``` javascript
	/**
	 * father()是由window对象来调用的，
	 * 因此father()中对于 this.son() 的引用也相当于 window对象在引用
	 * son()中打印 this.eyes 的值时，由于window对象中
	 * 并没有 eyes 变量的定义，因此结果为undefined
	 */

	function father(){
		var eyes = "beautiful";
		console.log(this instanceof Window);  // 结果: true
		this.son();
	}

	function son(){
		console.log("My eyes => ", this.eyes);
	}

	// 若全局范围(window对象作用域范围)拥有eyes变量，则会被son()引用
	// 例如:
	// var eyes = "大熊猫的眼睛";

	father();	// 结果: My eyes => undefined
 ```

2. 单单改变father()的调用者不足以修正此段代码。改变了调用者之后会发现，father并没有定义一个叫 son() 的方法就开始调用他了;
 ``` javascript
    /**
	 * 上一段代码的问题还不止一处
	 * 如果我们仅仅是改变father()方法的调用者，
	 * 将会出现对于 son()方法的引用异常
	 * 原因很简单: son() 并不是father()函数内部定义的方法
	 */
	father.call(father); // this.son is not a function
 ```

3. 为father添加一个son()方法可以解决以上问题
 ``` javascript
	/**
	 * 解决上述问题的方法就是为father定义son属性,
	 * 并且赋值为当前全局(window对象)的son()方法
	 * 但此时还有一个问题，函数作用域内的声明变量不能作为函数的属性
	 * 通过正确的this进行引用
	 * 因此还需要首先为father函数对象添加 eyes 属性
	 */
	father.son = this.son;
	father.eyes = "最美丽!";
	father.call(father);
 ```

##### test4.js : 箭头函数

1. 箭头函数不采用以上this绑定规则，而是以自己定义的位置的this来确定函数内部的this是什么。
 ``` javascript
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
	// 箭头函数方式定义的函数,this已被绑定为定义时的this,
	// 无法变换为别的调用者
	console.log( showName1.call(obj) ); // 结果: 樱木花道
	// 普通函数依照调用者来确定内部的this指向
	console.log( showName2.call(obj) ); // 结果: 坂田银时
 ```

2. 误区释疑: 对象中的属性的值是箭头函数定义的函数, 那么当前函数中的this指向谁?
 ``` javascript
	var name = "樱木花道";
    var obj2 = {
	  name: "神乐",
	  printName: () => {
	    console.log(this.name);
	  }
	}
	obj2.printName(); // 樱木花道
 ```

3. 以上问题其实很容易解释: 当前对象处于Window作用域中，因此给that属性赋值得到的也是Window对象。箭头函数绑定了当前定义作用域内的this，并继承给了函数内部。
 ``` javascript
	var name = "樱木花道";
    var obj2 = {
	  name: "神乐",
	  printName: () => {
	    console.log(this.name);
	  },
	  that: this
	}
	obj2.printName(); // 樱木花道
	console.log( obj2.that ); // Window对象
 ```
