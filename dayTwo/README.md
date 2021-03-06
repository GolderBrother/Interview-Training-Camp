# 一线大厂前端面试题4天训练营-第二天

## 1. 对象(数组)的深克隆和浅克隆（头条）

```js
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};

let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];

//=>深克隆
function deepClone(obj) {
    if (typeof obj !== "object") return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    let cloneObj = new obj.constructor;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

```

## 2. BAT笔试题中几道关于堆栈内存和闭包作用域的题

```js
//example 1
let a={}, b='0', c=0;  
a[b]='珠峰';
a[c]='培训';  
console.log(a[b]);
​
---------------------
//example 2
let a={}, b=Symbol('1'), c=Symbol('1');  
a[b]='珠峰';
a[c]='培训';  
console.log(a[b]);
​
---------------------
//example 3
let a={}, b={n:'1'}, c={m:'2'};  
a[b]='珠峰';
a[c]='培训';  
console.log(a[b]);
var test = (function(i){
    return function(){
        alert(i*=2);
    }
})(2);
test(5);
var a=0,
    b=0;
function A(a){
    A=function(b){
        alert(a+b++);
    };
    alert(a++);
}
A(1);
A(2);
```

## 3.一道关于面向对象面试题所引发的血案（阿里）
[Operator_Precedence](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)*

```js
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
4.一道面试题让你彻底掌握JS中的EventLoop（头条）
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

```

第一题：写出下面代码输出的结果

function A(){
    alert(1);
}
function Func() {
    A=function(){
       alert(2);
    };
    return this;
}
Func.A=A;
Func.prototype={
    A:()=>{
       alert(3);
    }
};
A();
Fn.A();
Fn().A();
new Fn.A();
new Fn().A();
new new Fn().A();
第二题：写出下面代码输出的结果

var x=2;
var y={
    x:3,
    z:(function(x){
        this.x*=x;
        x+=2;
        return function(n){
            this.x*=n;
            x+=3;
            console.log(x);
        }
    })(x)
};
var m=y.z;
m(4);
y.z(5);
console.log(x, y.x);
第三题：写出下面代码输出的结果

var a = ?;
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}
第四题：写出下面代码输出的结果

var x=0,
    y=1;
function fn(){
    x+=2;
    fn=function(y){
        console.log(y + (--x));
    };
    console.log(x, y);
}
fn(3);
fn(4);
console.log(x, y);
第五题：写出下面代码输出的结果

setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9);