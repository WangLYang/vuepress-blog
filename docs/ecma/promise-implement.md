#  class Promise 

根据Promise a+ 规范实现 class Promise
```javascript
var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'

class myPromise {
    constructor(executor) {
        this.state = PENDING; //初始化pending状态
        this.value = undefined; //resolve的值
        this.reason = undefined; //reject的原因
        this.onFulfilledFn = []; //
        this.onRejectedFn = [];

        let resolve = (value) => {
            if (value instanceof myPromise) {
                return value.then(resolve, reject)
            }

            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value
                this.onFulfilledFn.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason
                this.onRejectedFn.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    //2.2 : A promise must provide a then method to access its current or eventual value or reason.
    then(onFulfilled, onRejected) { //A promise’s then method accepts two arguments:
        let promise2;
        //2.2.1 Both onFulfilled and onRejected are optional arguments:
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (x) => x;
        onRejected = typeof onRejected === "function" ? onRejected : (e) => {
            throw e
        };
        //2.2.7 then must return a promise 
        switch (this.state) {
            case FULFILLED:
                promise2 = new myPromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            var x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                break;
            case REJECTED:
                promise2 = new myPromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            var x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                break;
            case PENDING:
                promise2 = new myPromise((resolve, reject) => {
                    this.onFulfilledFn.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value)
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error)
                            }
                        }, 0)

                    })
                    this.onRejectedFn.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error)
                            }
                        }, 0)

                    })
                })
                break;
        }
        return promise2
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    let executed = false;
    //2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
    if (promise2 === x) {
        return reject(new TypeError('x === promise'))
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (executed) return;
                    executed = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, (err) => {
                    if (executed) return;
                    executed = true;
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (executed) return;
            executed = true;
            reject(error)
        }
    } else {
        resolve(x)
    }
}


module.exports = {
    deferred() {
        var resolve, reject
        var promise = new myPromise(function (res, rej) {
            resolve = res
            reject = rej
        })
        return {
            promise,
            resolve,
            reject
        }
    }
}
```

