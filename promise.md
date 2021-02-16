### 函数对象与实例对象
$('#test') $函数
$.ajax() $函数对象
const fn=new Fn() new返回的fn是实例对象
### 捕获 抛出错误
捕获错误
try{
<!-- const e={} -->
<!-- e() -->
}
catch(error){
console.log(error.message)}
抛出错误
throw new Error('当前时间为偶数'+time)
### promise
状态 pending变成resolved 成功 结果数据 value
     pending变成rejected 失败 结果数据 error

指定回调函数的方式更灵活
旧的：必须在启动异步任务前指定
promise：启动异步任务，返回promise对象，给promise对象绑定回调函数
#### promise 构造函数
Promise (excutor){}
(resolve,reject)=>{}
resolve函数 成功调用函数 value=>{}
reject函数 失败调用函数 reason=>{}
#### promise then方法
(onResolved,onRejected)=>{}
onResolved函数 成功回调函数 (value)=>{}
onRejected函数 失败回调函数 (reason)=>{}
### API分类
REST API restful
发送请求进行CRUD操作由请求方式决定
同一请求路径可以进行多个操作
请求方式可以用到GET/POST/PUT/DELETE
非REST API restless
请求方式不决定请求的CRUDduiying
一种请求路径只对应一个操作
一般只有GET/POST
### axios