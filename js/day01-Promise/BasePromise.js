/**
 * promise状态
 */

 const PENDING = 'PENDING',
       FULFILLED = 'FULFILLED',
       REJECTED = 'REJECTED';

/**
 * 基础版Promise，提供最基础的功能
 */

class BasePromise {
  constructor(executor) {
    this.status = PENDING; // 默认状态为PENDING
    this.value = undefined; // 保存成功状态的值，默认为undefined
    this.reason = undefined; // 保存失败状态的值
    this.onResolvedCallback = []; // 保存成功的回调
    this.onRejectedCallback = []; // 保存失败的回调

    // 成功时调用的方法
    const resolve = (value) => {
      // 状态只能从pending到FULFILLED或者REJECTED，所以要判断
      if(this.status === PENDING) {
        this.status = FULFILLED;
         this.value = value;

         this.onResolvedCallback.forEach(fn => fn());
      }
    }

    // 失败时调用的方法
    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED;
         this.reason = reason;

         this.onRejectedCallback.forEach(fn => fn());
      }
    }

    try {
      // 立即执行, 将resolve和reject函数传给使用者
      executor(resolve, reject);

    } catch (error) {
     // 发生异常是执行逻辑
     reject(error)
    }
  }

  // 包含一个then方法,并接收两个参数onFulfilled, onRejected
  then(onFulfilled, onRejected) {
    if(this.status === PENDING) {
      this.onResolvedCallback.push(() => onFulfilled(this.value))
      this.onRejectedCallback.push(() => onRejected(this.reason))
    } else if(this.status === FULFILLED) {
      onFulfilled(this.value)
    } else if(this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

// module
function resolvePromise(promise2, x, resolve, reject) {
  // 如果自己等待自己完成则是错误的实现，用一个类型错误，结束掉promise
  console.log("==resolvePromise==000==", promise2, x, resolve, reject)
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  let called; // 标记是否已调用，只调用一次

  if((typeof x === 'object' && x!== null) || typeof x === 'function') {
    try {
      // 为了判断resolve过就不再reject了(如reject与resolve同时调用的时候)
      let then = x.then;
      if(typeof then === 'function') {
        // 不要写成x.then，直接then.call就可以了, 因为x.then会再次取值。
        then.call(x, y => {
          // 如果执行过，则不再执行
          if ( called ) return;
          called = true;
          // 递归解析(因为可能promise中还有promise)
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          // 只要失败就reject
          if(called) return;
          called = true;
          reject(r)
        })
      } else {
        // 如果x.then是一个普通值就直接返回resolve作为结果
        resolve(x)
      }
      
    } catch (error) {
      if(called) return;
      called = true;
      reject(error);
    }
  } else {
    // 如果x.then是一个普通值就直接返回resolve作为结果
    resolve(x)
  }
}

class MyPromise {
  // constructor(executor) {
  //   this.status = PENDING;
  //   this.value = undefined;
  //   this.reason = undefined;
  //   this.onRejectedCallbacks = [];
  //   this.onResolvedCallbacks = [];

  //   const resolve = (value) => {
  //     if(this.status === PENDING) {
  //       this.status = FULFILLED;
  //       this.value = value;
  //       console.log("成功了---");
  //       this.onResolvedCallbacks.forEach(fn => fn())
  //     }
  //   }

  //   const reject = (reason) => {
  //     if(this.status === PENDING) {
  //       this.status = REJECTED;
  //       this.reason = reason;
  //       console.log("失败了---");
  //       this.onRejectedCallbacks.forEach(fn => fn())
  //     }
  //   }

  //   try {
  //     executor(resolve, reject)
  //   } catch (err) {
  //     reject(err);
  //   }
  // }

  // then(onSuccess, onFailure) {
  //   onSuccess = typeof onSuccess === 'function' ? onSuccess : v => v;
  //   onFailure = typeof onFailure === 'function' ? onFailure : error => { throw error };

  //   // 每次返回一个新的promise
  //   const promise2 = new MyPromise((resolve, reject) => {
  //     console.log("FULFILLED=this.status=", this.status);
  //     if(this.status === FULFILLED) {
  //       console.log("fulfilled=1=");
  //       setTimeout(() => {
  //         try {
  //           const x = onSuccess(this.value);
  //           // x可能是一个promise
  //           console.log("fulfilled=2=", promise2, x);
  //           resolvePromise(promise2, x, resolve, reject);
  //         } catch (error) {
  //           reject(error)
  //         }
  //       }, 0)
  //     }

  //     console.log("REJECTED=this.status=", this.status);
  //     if(this.status === REJECTED) {
  //       console.log("REJECTED=1=");
  //       setTimeout(() =>{
  //         try {
  //           const x = onFailure(this.reason);
  //           console.log("REJECTED=2=", promise2, x);
  //           resolvePromise(promise2, x, resolve, reject);
  //         } catch (error) {
  //           reject(error)
  //         }
  //       }, 0)
  //     }

  //     if(this.status === PENDING) {
  //       console.log("PENDING-success=1=");
  //       this.onResolvedCallbacks.push(() => {
  //         try {
  //           const x = onSuccess( this.value );
  //           console.log("PENDING-success=2=", promise2, x);
  //           resolvePromise( promise2, x, resolve, reject );
  //         } catch (error) {
  //           reject(error);
  //         }
  //       });
  
  //       console.log("PENDING-failure=1=");
  //       this.onRejectedCallbacks.push(() => {
  //         try {
  //           const x = onFailure( this.reason );
  //           console.log("PENDING-failure=2=", promise2, x);
  //           resolvePromise( promise2, x, resolve, reject );
  //         } catch (error) {
  //           reject(error);
  //         }
  //       });
  //     }

  //   })

  //   return promise2;
  // }
  
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error; };

    const promise2 = new Promise((resolve, reject) => {
      if(this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        })
      }

      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });

    return promise2;
  }

  catch(fn) {
    return this.then(null, fn);
  }
}





// module.exports = BasePromise
module.exports = MyPromise




// function resolvePromise(promise2, x, resolve, reject) {
//   if(promise2 === x) {
//     return reject(new  TypeError("chaining circle detected!"));
//   }

//   let called = null;

//   if((typeof x === "object" && x !== null) || typeof x === "function") {
//     try {
//       const then = x.then; // 取出上一个promise的then方法
//       if(typeof then === "function") {
//         then.call(x, y => {
//           if(called) return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject)
//         }, r => {
//           if(called) return;
//           called = true;
//           reject(r);
//         })
//       } else {
//         resolve(x);
//       }
//     } catch(error) {
//       if(called) return;
//       called = true;
//       reject(error);
//     }
//   } else {
//     resolve(x)
//   }
// }



// function resolvePromise(promise2, x, resolve, reject) {
//   if(x === promise2) {
//     return reject(new TypeError("chaining cycle detected!"))
//   }

//   let called = false;

//   if(x !== null && (typeof x === "object" || typeof x === "function")) {
//     try {
//       const then = x.then;
//       if(typeof then === "function") {
//         then.call(x, r => {
//           if(called) return;
//           called = true;
//           resolveePromise(promise2, r, resolve, reject);
//         }, error => {
//           if(called) return;
//           called = true;
//           reject(error)
//         })
//       } else {
//         resolve(x)
//       }
//     } catch (error) {
//       if(called) return;
//       called = true;
//       reject(error);
//     }
//   } else {
//     resolve(x);
//   }
// }


// class Promise {
//   constructor(executor) {
//     this.status = PENDING;
//     this.value = undefined;
//     this.reason = undefined;
//     this.onResolvedCallbacks = [];
//     this.onRejectedCallbacks = [];

//     const resolve = (value) => {
//       if(this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = value;
//         this.onResolvedCallbacks.forEach(fn => fn());
//       }
//     }

//     const reject = (reason) => {
//       if(this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = reason;
//         this.onRejectedCallbacks.forEach(fn => fn());
//       }
//     }

//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
//     onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error; };

//     const promise2 = new Promise((resolve, reject) => {
//       if(this.status === PENDING) {
//         this.onResolvedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               const x = onFulfilled(this.value);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (error) {
//               reject(error);
//             }
//           }, 0)
//         })

//         this.onRejectedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               const x = onRejected(this.reason);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (error) {
//               reject(error);
//             }
//           }, 0)
//         })
//       }

//       if(this.status === FULFILLED) {
//         setTimeout(() => {
//           try {
//             const x = onResolved(this.value);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         }, 0);
//       }

//       if(this.status === REJECTED) {
//         setTimeout(() => {
//           try {
//             const x = onRejected(this.reason)
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         }, 0);
//       }
//     });

//     return promise2;
//   }

//   catch(fn) {
//     return this.then(null, fn);
//   }

// }






// Promise.resolve = function(value) {
//   return new Promise((resolve, reject) => {
//     resolve(value);
//   }) 
// }

// Promise.reject = function(value) {
//   return new Promise((resolve, reject) => {
//     reject(value);
//   })
// }

// Promise.race = function(promises) {
//   return new Promise((resolve, reject) => {
//     promises.forEach(promise => promise.then(resolve, reject))
//   })
// }

// Promise.all = function(promises) {
//   let arr = [];
//   let i = 0;
//   function processData(index, data) {
//     arr[index] = data;
//     i++;
//     if(i === promises.length) {
//       resolve(arr);
//     }
//   }

//   return new Promise((resolve, reject) => {
//     promises.forEach((promise, index) => {
//       promise.then(data => processData(index, data))
//     })
//   })
// }