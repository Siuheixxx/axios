// 自定义promise模块
(function (window) {
    const PENDING='pengding'//未确定状态
    const RESOLVED='resolved'//成功状态
    const REJECTED='rejected'//失败状态
    // promise构造函数
    function Promise(excutor) {
        const self=this//Promise实例对象
        // 改变状态
        self.status=PENDING//状态属性
        self.data=undefined//结果属性
        self.callbacks=[]
        // 将promise的状态改为成功，指定成功的value
        function resolve(value){
            // 如果当前状态不是pending，直接结束
            if(self.status!==PENDING)return
            self.status=RESOLVED//改状态
            self.data=value//保存成功的value
            //异步调用所有缓存的待执行成功的回调函数
            if(self.callbacks.length>0){
                // 启动一个延迟时间为0的定时器，在定时器的回调中执行所有成功的回调
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj=>{
                        callbacksObj.onResolved(value)
                    })
                })
            }
        }
        // 将promise的状态改为成功，指定成功的value
        function reject(reason){
            // 如果当前状态不是pending，直接结束
            if(self.status!==PENDING)return
            self.status=REJECTED//改状态
            self.data=reason//保存失败的reason
            if(self.callbacks.length>0){
                // 启动一个延迟时间为0的定时器，在定时器的回调中执行所有失败的回调
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj=>{
                        callbacksObj.onRejected(reason)
                    })
                })
            }
        }
        // 调用excutor来启动异步任务
        try{
            excutor(resolve,reject)
        }catch(error){
            reject(error)
        }
    }
    /* 
    成功失败回调函数,返回一个新的promise对象
    1.当前promise是pengding，保存回调函数
    2.当前promise是resolved，异步执行成功的回调函数是onResolved
    3.当前promise是rejected，异步执行成功的回调函数是onRejected
    返回一个新的promise对象
    他的结果状态由onResolved或者onRejected执行的结果决定
    1.抛出error==>变为rejected,结果为error
    2.返回值不是promise 变为resolved,结果为返回值
    3.返回值是promise,由这个promise的值决定新的promise的结果(成功/失败)
    */
    Promise.prototype.then = function (onResolved, onRejected) {
        const self=this
        
        return new Promise((resolve,reject)=>{
            function handle(callback){
            if(self.status===RESOLVED){
                setTimeout(() => {
                    try{
                        const result=onSolved(self.data)
                        if(result instanceof Promise){
                            result.then(
                                value=>resolve(value),
                                reason=>reject(reason)
                            )
                        }else{
                            resolve(result)
                        }
                    }catch(error){
                        reject(error)
                    }
                })
            }
        }
        else if(self.status===REJECTED){
                setTimeout(() => {
                    try{
                        const result=onRejected(self.data)
                        if(result instanceof Promise){
                            result.then(
                                value=>resolve(value),
                                reason=>reject(reason)
                            )
                        }else{
                            resolve(result)
                        }
                    }catch(error){
                        reject(error)
                    }
                })
            }else{
                self.callbacks.push({//不是直接保存/失败回调
                    onResolved(value){
                        
                    },
                    onRejected(reason){

                    }
                })
            }
        })
    }
    // 指定失败的回调
    Promise.prototype.catch=function(onRejected){

    }
    // 指定value的成功promise
    Promise.resolve=function(value){

    }
    // 指定value的失败promise
    Promise.reject=function(reason){
        
    }
    // promise数组,所有promise成功才成功，否则失败
    Promise.all=function(value){

    }
// promise数组,第一个完成的promise决定
    Promise.race=function(value){

    }
    // 向外暴露Promise
    window.Promise = Promise
})(window)