# 一线大厂前端面试题4天训练营-第四天

## 1. 数组去重和排序的多种实现算法
[数组去重](https://blog.csdn.net/weixin_42412046/article/details/81459294)

[十大经典排序](https://www.cnblogs.com/onepixel/articles/7674659.html)

- indexOf / includes
- 双循环
- 先排序，在相邻比较（基于正则）

```js
let ary = [12, 23, 12, 15, 25, 23, 25, 14, 16];
ary.sort((a, b) => a - b);
let str = ary.join('@') + '@';
let reg = /(\d+@)\1*/g;
ary = [];
str.replace(reg, (n, m) => {
    m = Number(m.slice(0, m.length - 1));
    ary.push(m);
});
console.log(ary);
```


- 对象键值对

对象属性名相同的，后面的会覆盖前面的

那数组中的每项想新容器中存储，如果当前项之间有存储过，说明是重复的,删掉当前项就行了

```js
let obj={};
for(let i=0;i<ary.length;i++){
	let item=ary[i];
	if(typeof obj[item]!=='undefined'){
		ary[i]=ary[ary.length-1];
		ary.length--;
		i--;
		continue;
	}
	obj[item]=item;
}
obj=null;
console.log(ary);
```

```js
for(let i=0;i<ary.length-1;i++){
	let item=ary[i],
		args=ary.slice(i+1);
	if(args.indexOf(item)>-1){
		//包含：我们可以把当前项干掉  
		// splice删除
		// 1. 原来数组改变，这样如果i继续++，则会产生数组塌陷
		// 2. 性能不好：当前项一旦删除，后面项索引都要变
		// ary.splice(i,1);
		// i--;

		//赋值为null，后续filter一次
		// ary[i]=null;

		//用最后一项替换
		ary[i]=ary[ary.length-1];
		ary.length--;
		i--;
	}
}
// ary=ary.filter(item=>item!==null);
console.log(ary);

```

- ES6 的 Set 方法

```js
let ary = [12, 23, 12, 15, 25, 23, 25, 14, 16];
const newArr = [...new Set(ary)];
const newArr2 = Array.from(new Set(ary));
console.log(newArr);
console.log(newArr2);
```

## 数组排序

- 冒泡排序

> 思路：拿当前项和后一项对比，比它大，就交换位置，结果是每一轮比较后，当前数组中虽大的放到末尾
> 规律：一轮轮的比较，每一轮都从第一项开始，当前项A和后一项B进行比较，如果A>B,则元素A和B交换位置
> 最大轮数： arr.length - 1
> 每一轮次数：最多length-1次(不用和自己比)
> 还要把之前比较完的多少轮(i)减掉

```js
function bubble(ary){
    let temp=null;
    // 外层循环I控制比较的轮数
    for(let i=0;i<ary.length-1;i++){
        // 里层循环控制每一轮比较的次数J
        for(let j=0;j<ary.length-1-i;j++){
            if(ary[j]>ary[j+1]){
                // 当前项大于后一项
                temp=ary[j];
                ary[j]=ary[j+1];
                ary[j+1]=temp;
            }
        }
    }
    return ary;
}
let ary = [12,8,24,16,1];
ary=bubble(ary);
console.log(ary);
```

- 插入排序

抓扑克牌后排序，很最后一张牌比较，找个位置坐下
新抓的牌跟手中的牌进行比较，从后往前比，新抓的牌比手里的某张牌大了，则把当前牌放到手里某张牌的后面，反之放前面，依次比较
如果比到第一项，就直接把新牌放到第一项即可

```js
function insert(ary){
    // 1.准备一个新数组，用来存储抓到手里的牌，开始先抓一张牌进来
    let handle=[];
    handle.push(ary[0]);

    // 2.从第二项开始依次抓牌，一直到把台面上的牌抓光
    for(let i=1;i<ary.length;i++){
        // A是新抓的牌
        let A=ary[i];
        // 和HANDDLE手里的牌依次比较（从后向前比）
        for(let j=handle.length-1;j>=0;j--){
            // 每一次都要比较的手里的牌
            let B=handle[j];
            // 如果当前新牌A比要比较的牌B大了，就把A放到B的后面
            if(A>B){
                handle.splice(j+1,0,A);
                break;
            }
            // 已经比到第一项，我们把新牌直接放到手中最前面即可
            if(j===0){
                handle.unshift(A);
            }
        }
    }
    return handle;
}
let ary = [12,8,24,16,1];
ary=insert(ary);
console.log(ary);
```

- 快速排序

类似二叉树的二分法，找出中间项，大的放中间项右边(放数组里面)，小的放中间项右边(放数组里面)，依次排序
没有就放空数组[]

```js
function quick(ary){
    // 4.结束递归（当ARY中小于等于一项，则不用处理）
    if(ary.length<=1){
        return ary;
    }
    // 1.找到数组的中间项，在原有的数组中把它移除
    let middleIndex=Math.floor(ary.length/2);
    let middleValue=ary.splice(middleIndex,1)[0];
    // 2.准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
    let aryLeft=[],
        aryRight=[];
    for(let i=0;i<ary.length;i++){
        let item=ary[i];
        item<middleValue?aryLeft.push(item):aryRight.push(item);
    }
    // 3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止（最后让左边+中间+右边拼接成为最后的结果）
    return quick(aryLeft).concat(middleValue,quick(aryRight));  
}
let ary = [12,8,15,16,1,24];
ary=quick(ary);
console.log(ary);
```

## 2.数组扁平化的N种实现方案

```js
let arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

```

1. 使用ES6中提供的 Array.prototype.flat 处理

```js
arr = arr.flat(Infinity);
```

2. 把数组直接变为字符串即可（数组TOSTRING之后，不管你有多少级，最后都会变为以逗号分隔的字符串，没有中括号和所谓的层级了），相当于直接的扁平化了

```js
arr = arr.toString().split(',').map(item => {
 return Number(item);
});
```

(5)转换为字符串

```js
// a. 使用toString方法
arr.toString().split(",").map(item => parseFloat(item));

// b. JSON.stringify()
arr = JSON.stringify(arr).replace(/[\[|\]]/g, '').split(',').map(item => Number(item));

```

4. 基于数组的some方法进行判断检测：验证数组中的某一项有没有符合函数中提供的规则的

```js
while (arr.some(item => Array.isArray(item))) {
 arr = [].concat(...arr);
}
```

5. 自己递归处理

```js
~ function () {
    function myFlat() {
        let result = [],
            _this = this;
        //=>循环ARR中的每一项，把不是数组的存储到新数组中
        let fn = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (Array.isArray(item)) {
                    fn(item);
                    continue;
                }
                result.push(item);
            }
        };
        fn(_this);
        return result;
    }
    Array.prototype.myFlat = myFlat;
}();
arr = arr.myFlat();
```

6. 使用正则把方括号去掉

```js
const reg = /((\[)*)(\])*/g;
const arr = [1,[2,[3,[4,5,6,7,8]]],9];
arr.join().replace(reg, '');
```

7. 使用数组的join方法

```js
[1,[2,[3,[4,5,6,7,8]]],9].join().split(",");
```

8. reduce

```js
const arr = [1,[2,[3,[4,5,6,7,8]]],9];
const getNewArr = arr => arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? getNewArr(curr) : curr), []);
console.log(getNewArr(arr));
```

## 3.阿里面试题之斐波那契数列

题目是这样的：

请实现一个```fibonacci [ˌfɪbəˈnɑːtʃi]``` 函数，要求实现以下的功能： 
斐波那契数列为：```[1,1,2,3,5,8,13,21,…] ```
```fibonacci(0) -> 1 ``` -> 输出第一个(索引为0)元素的值
```fibonacci(4) -> 5 ``` -> 输出第五个(索引为4)元素的值

## 4.字节跳动经典算法题

> 实现思路：数组倒数第一项和倒数第二项之和，加到数组的最后面
```F(n) = F(n - 1) + F(n - 2);```

实现方法：

(1)
```js
function fibonacii(n){
    if(n <= 1) return 1;
    // 需要创建数组的默认值
    let arr = [1, 1];
    // 即将要创建多少个
    let i = n + 1 - 2;
    while(i > 0) {
	arr.push(arr[arr.length-2] + arr[arr.length-1]);
 	i--;
    }
    // 返回最后一项
    return arr[arr.length-1];
}

console.log(fibonacii(5));
```

(2)
```js
function fibonacii(count) {
    function fn(count, curr = 1, next = 1){
	if(count = 0) return curr;
    	// 每次循环后，将count-1,然后再将下一项(next)作为当前项，并更新下一项的值为当前项加上下一项
    	else return fn(count - 1, next, curr+next);
    }
    return fn(count);
}
```

**好理解**

(3) 
```js
function fibonacii(n){
    if(n-2 >= 0) return fibonacii(n-2)+fibonacii(n-1);
    else return 1;
} 
```

(4)

```js
/*
 * 输入一个正数N，输出所有和为N的连续正数序列
 * 例如：输入15
 * 结果：[[1,2,3,4,5],[4,5,6],[7,8]]
 */
 function createArr(n,len){
    let arr=new Array(len).fill(null),
        temp=[];
    arr[0]=n;
    arr=arr.map((item,index)=>{
        if(item===null){
            item=temp[index-1]+1;
        }
        temp.push(item);
        return item;
    });
    return arr;
}
function fn(count){
    let result=[];
    //=>求出中间值
    let middle=Math.ceil(count/2);
    //从1开始累加
    for(let i=1;i<=middle;i++){
        //控制累加多少次
        for(let j=2;;j++){
            //求出累加多次的和
            let total=(i+(i+j-1))*(j/2);
            if(total>count){
                break;
            }else if(total===count){
                result.push(createArr(i,j));
                break;
            }
        }
    }
    return result;
}
```


