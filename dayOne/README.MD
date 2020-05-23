# 一线大厂前端面试题4天训练营(1)

1. 大前端时代需要掌握的技术栈
HTML5

https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5

语义化标签类

音视频处理

canvas / webGL

history API

requestAnimationFrame

地理位置

web scoket

……

CSS3

常规

动画

盒子模型

响应式布局

……

JavaScript

ECMAScript 3/5/6/7/8/9

DOM

BOM

设计模式

底层原理

堆栈内存

闭包作用域 AO/VO/GO/EC/ECSTACK

面向对象OOP

THIS

EventLoop

浏览器渲染原理

回流重绘

……

网络通信层

AJAX / Fetch / axios

HTTP1.0 / 2.0

TCP

跨域处理方案

性能优化

……

Hybrid或者APP再或者小程序

Hybrid

uni-app

RN

Flutter

小程序 MPVUE

Weex

PWA

……

工程化方面

webpack

git

linux / nginx

……

全栈方面

node

express

koa2

mongodb

nuxt.js / next.js

……

框架方面

Angular

Vue

基础知识

核心原理

vue-router

vue-cli

vuex

element ui

vant

cube

SSR

优化

……

React

基础知识

核心原理

react-router-dom

redux

react-redux

dva

umi

mobix

antd

antd pro

SSR

优化

……

……

游戏方向

可视化或者AI方向

……

Alt text

2. 阿里巴巴九段人才评估方案
面试要求

2012年：我要做前端（啪…，那叫网页制作）

2013年：我要做前端，我会HTML5+CSS3，JQUERY会用

2014年：我懂JQUERY源码，JS原生很好，可以做前后端分离(AJAX)

2015年：我会Hybrid，研究过backbone/sea.js/require.js/grunt…

2016年：我会angular，研究过phonegap / cordova / ionic，HTML5很溜 ….

2017年：我会react / vue，我会node.js

2018年：我会react native、小程序开发、flutter、webpack，可以做数据可视化、能独立封装公共组件、有很多大型项目经验….

2019年：

面试官：上面那些你都会吗？ 面试者：不会 面试官：啪….，那你来面试个啥

面试者：会 面试官：好的，那你说一下他们的底层实现原理吧 =>啪啪啪….

2020年：面试官A：让你来公司面试，你还能面过吗？ 面试官B：不能！ 面试官A：那咋办，咱们降低点难度？ 面试官B：算了，还是继续吧….

Alt text

3. BAT/TMD这种大公司到底是怎样面试的
一个问题就知道你会不会CSS了，(￣ε(#￣)☆╰╮(￣▽￣///)

什么是标签语义化

都有哪些标签，都是啥意思

块级标签和行内标签的区别

如何转换

display除了这几个值还有哪些

display:none

让元素隐藏，你可以怎么做？

display:none和visibility:hidden的区别?

opacity的兼容处理

filter还能做哪些事情

……

display:flex

项目中你什么时候用到了flex

除了这种方式能居中还有哪些？

响应式布局还可以怎么做？

都有哪些盒子模型

……

o(╥﹏╥)o

好了，咱们换下一个题….

说一下，你自己感觉自己擅长哪些？ 
(#^.^#) 没事的，在我们眼里，你擅长的点我比你更擅长，如果不是，没关系，后面还有P7/P8们兜着呢！^_^

说一下，这个需求怎么做？ 
还有吗 (￣▽￣)／ 
还有吗 (￣▽￣)／ 
…… 
那说一下，你感觉这几种方式哪个更好，各自有啥问题……

总之一句话，不把你问“死”，算我这次面试失败！！！

Alt text

几道前端经典的面试题
1.掌握盒子水平垂直居中的五大方案
定位：三种

display:flex

JavaScript

display:table-cell

.father{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    //=>宽高不能是百分比
}
2.关于CSS3中盒模型的几道面试题
标准盒子模型

Alt text

IE盒子模型（怪异盒子模型）

Alt text

FLEX盒模型

Alt text

多列布局

Alt text

3.掌握几大经典布局方案
圣杯布局 
双飞翼布局 
=> 左右固定，中间自适应

圣杯布局：浮动和负MARGIN

```html
<style>
    html,
    body {
        height: 100%;
        overflow: hidden;
    }

    .container {
        height: 100%;
        padding: 0 200px;
    }

    .left,
    .right {
        width: 200px;
        min-height: 200px;
        background: lightblue;
    }

    .center {
        width: 100%;
        min-height: 400px;
        background: lightsalmon;
    }

    .left,
    .center,
    .right {
        float: left;
    }

    .left {
        margin-left: -100%;
        position: relative;
        left: -200px;
    }

    .right {
        margin-right: -200px;
    }
</style>

<div class="container clearfix">
    <div class="center"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```

双飞翼布局：浮动和负MARGIN

```html
<style>
    html,
    body {
        height: 100%;
        overflow: hidden;
    }

    .container,
    .left,
    .right {
        float: left;
    }

    .container {
        width: 100%;
    }

    .container .center {
        margin: 0 200px;
        min-height: 400px;
        background: lightsalmon;
    }

    .left,
    .right {
        width: 200px;
        min-height: 200px;
        background: lightblue;
    }

    .left {
        margin-left: -100%;
    }

    .right {
        margin-left: -200px;
    }
</style>

<body class="clearfix">
    <div class="container">
        <div class="center"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</body>
```

使用CALC

.center {
    /* 兼容到IE9 */
    width: calc(100% - 400px);
    min-height: 400px;
    background: #ffa07a;
}
......
flex 
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool

html,
body {
    overflow: hidden;
}

.container {
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.left,
.right {
    flex: 0 0 200px;
    height: 200px;
    background: lightblue;
}

.center {
    flex: 1;
    min-height: 400px;
    background: lightsalmon;
}
定位

<style>
    html,
    body {
        height: 100%;
        overflow: hidden;
    }

    .container {
        position: relative;
        height: 100%;
    }

    .left,
    .right {
        position: absolute;
        top: 0;
        width: 200px;
        min-height: 200px;
        background: lightblue;
    }

    .left {
        left: 0;
    }

    .right {
        right: 0;
    }

    .center {
        margin: 0 200px;
        min-height: 400px;
        background: lightsalmon;
    }
</style>
4.移动端响应式布局开发的三大方案
media

rem

flex

vh / vw

……

课后作业
1. 使用css，让一个div消失在视野中，发挥想象力 ？
2. 请说明z-index的工作原理，适用范围？
文档流

定位

3. 谈谈你对HTML5的理解？
4. 如何使一个div里面的文字垂直居中，且该文字的大小根据屏幕大小自适应？
5. 不考虑其它因素，下面哪种的渲染性能比较高？
.box a{
    ...
}

a{
    ...
}
