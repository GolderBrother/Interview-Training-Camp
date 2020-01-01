# 一线大厂前端面试题4天训练营-第三天

## 各大框架里面的核心内容

### vue

- vue-cli 3.0 （2.0向3.0的过渡）

    - 配置
    - 优化

- vue基础知识

    - 双向数据绑定

    - template模板渲染语法和原理（vue-loader 、 虚拟DOM）

    - 指令和自定义指令

    - methods computed watch filters

    - class / style

    - 条件和循环渲染

    - 事件处理

    - 表单处理

    - 组件（属性）

    - ref

    - 生命周期

    - 插槽

    - transition

    - 渲染函数和jsx

    - 插件编写

    - 混入

    - devtools

    - ……

- vue-router

    - 基础知识

    - 动态路由

    - 编程式导航

    - 命名路由和命名容器

    - 导航守卫

    - HASH和BROWSER路由

    - 路由原理

    - ……

- vuex

    - state

    - getter

    - mutation

    - action

    - module

    - mapXxx

    - 实现原理

    - ……

- 单元测试

    - SSR服务器渲染 nuxt.js

    - UI组件库

    - ……

- react

    - create-react-app

    - 配置

    - 优化

    - react基础

    - JSX语法（虚拟DOM）

    - 状态

    - 属性

    - ref

    - 组件

    - 生命周期

    - PureComponent

    - Hooks

    - ……

- react-router-dom

    - redux

    - redux

    - react-redux

    - 中间件

    - ……

    - dva

    - umi

    - typescript

    - UI组件

    - SSR服务器渲染 next.js

    - ……


## 1. Vue2.0/3.0双向数据绑定的实现原理

### ES5：Object.defineProperty

```js
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        let newObj = {
            ...obj
        };
        Object.defineProperty(obj, 'name', {
            get() {
                return newObj.name;
            },
            set(val) {
                newObj.name = val;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = newObj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>

```

### ES6：Proxy

```js
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        obj = new Proxy(obj, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                target[prop] = value;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = obj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>
```

## 2. MVC和MVVM的区别


## 3. 跨域问题的解决方案和实现原理
跨域问题的产生及其价值意义

JSONP跨域解决方案的底层原理 
客户端

```js
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
    $.ajax({
        url: 'http://127.0.0.1:8001/list',
        method: 'get',
        dataType: 'jsonp',
        success: res => {
            console.log(res);
        }
    });
</script>

```
后台

```js
let express = require('express'),
    app = express();
app.listen(8001, _ => {
    console.log('OK!');
});
app.get('/list', (req, res) => {
    let {
        callback = Function.prototype
    } = req.query;
    let data = {
        code: 0,
        message: '珠峰培训'
    };
    res.send(`${callback}(${JSON.stringify(data)})`);
});
```

### 基于iframe的跨域解决方案

```js
window.name

document.domin

location.hash

post message

```

### CORS跨域资源共享 
客户端

```js
import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);

/*
 * 设置请求拦截器 
 * TOKEN校验（JWT）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.reject(error);
});

/*
 * 响应拦截器 
 */
axios.interceptors.response.use(response => {
    return response.data;
}, error => {});

export default axios;

```
服务器端

```js
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "";
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "PUT,POST,GET,DELETE,OPTIONS,HEAD");
    res.header("Access-Control-Allow-Methods", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With");
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

```

### 基于http proxy实现跨域请求

nginx反向代理

## 4.Vue/React框架中关于组件信息通信引发的面试题

### vue

- 属性传递

- 发布订阅（EventBus）：$on / $emit

- Provide / inject

- slot

- $parent / $children

- vuex

- react

- 属性

- 发布订阅

- React.createContext

- redux / react-redux / mobix / dva