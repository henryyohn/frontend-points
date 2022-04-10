
/**
 * 
1、typeof
typeof 是一个操作符，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 7 种：number、boolean、symbol、string、object、undefined、function 等。

typeof ''; // string 有效
typeof 1; // number 有效
typeof Symbol(); // symbol 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof [] ; //object 无效
typeof new Function(); // function 有效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效


2、instanceof
instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。 在这里需要特别注意的是：instanceof 检测的是原型，

我们用一段伪代码来模拟其内部执行过程：
instanceof (A,B) = {
    var L = A.__proto__;
    var R = B.prototype;
    if(L === R) {
        // A的内部属性 __proto__ 指向 B 的原型对象
        return true;
    }
    return false;
}

[] instanceof Array; // true
{} instanceof Object;// true
new Date() instanceof Date;// true


3、constructor
当一个函数 F被定义时，JS引擎会为F添加 prototype 原型，然后再在 prototype上添加一个 constructor 属性，并让其指向 F 的引用

''.constructor == String; //true
console.log(bool.constructor === Boolean);// true
console.log(num.constructor === Number);// true
console.log(str.constructor === String);// true
console.log(arr.constructor === Array);// true
console.log(obj.constructor === Object);// true
console.log(fun.constructor === Function);// true

console.log(haoxl.constructor === Student);// false
console.log(haoxl.constructor === Person);// true


4.使用Object.prototype.toString.call

console.log(Object.prototype.toString.call(bool));//[object Boolean]
console.log(Object.prototype.toString.call(num));//[object Number]
console.log(Object.prototype.toString.call(str));//[object String]
console.log(Object.prototype.toString.call(und));//[object Undefined]
console.log(Object.prototype.toString.call(nul));//[object Null]
console.log(Object.prototype.toString.call(arr));//[object Array]
console.log(Object.prototype.toString.call(obj));//[object Object]
console.log(Object.prototype.toString.call(fun));//[object Function]

 * 
 */


/**
 * 复杂对象深拷贝【函数、正则、循环引用】
 * @param {*} obj 
 * @returns 
 */
function deepCopy(obj) {
    if (!obj) return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            console.log("======", obj[key], Object.prototype.toString.call(obj[key]).slice(8,-1) === 'RegExp')
            if(typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}


function deepCopyPro(obj) {
    if (!obj) return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            console.log("======", obj[key], Object.prototype.toString.call(obj[key]).slice(8,-1) === 'RegExp')
            if(typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

