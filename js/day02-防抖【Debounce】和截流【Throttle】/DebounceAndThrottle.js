const { clear } = require("console");


/**
 * 防抖：高频触发事件时，限制在指定时间t内只能触发一次，如果t时间内再次触发，就清除之前的事件重新计时
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce0(fn, delay = 500) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
      timer = null;
    }

    timer = setTimeout(() => {
      console.log(...args)
      fn.call(this, ...args)
    }, delay)
  }
}

/**
 * 节流：按照设定的频率均匀的执行事件
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle0(fn, delay = 500) {
  let last = Date.now();
  return (...arguments) => {
    const current = Date.now();
    console.log("call", current, last, delay);
    if (current > last + delay) {
      console.log("=------", arguments)
      last = current;
      fn.apply(this, arguments);
    }
  }
}


/**
 * 防抖增强版，可以控制是否要首次执行
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
function debouncePlus(fn, delay = 500, immediate = false) {

  let timer = null;
  let validate = true;

  if (immediate) {
    return (...args) => {
      clearTimeout(timer)
      if (validate) {
        fn.apply(this, args);
        validate = false;
      }

      timer = setTimeout(() => {
        validate = true;
      }, delay);
    }
  }

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(...args)
      fn.call(this, ...args)
    }, delay)
  }

}

/**
 * 节流增强版，可以控制是否要首次执行
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
function throttlePlus(fn, delay = 500, immediate = false) {

  // 无法精细控制首次是否执行
  // let last = 0;
  // console.log("==闭包前==", last);
  // return (...args) => {
  //   let now = Date.now();
  //   console.log("call", now, last, delay);
  //   if(now > delay + last) {
  //     console.log("=------",args)
  //     last = now;
  //     fn.apply(this, args);
  //   }
  // }

  //可以精细控制是否首次执行
  let timer = null;
  let validate = true;
  let resultFunc = null;
  // 首次执行
  if (immediate) {
    resultFunc = (...args) => {
      if (validate) {
        fn.apply(this, args);
        validate = false;
        timer = setTimeout(() => {
          validate = true;
        }, delay)
      };
    }
  }

  // 首次不执行
  resultFunc = (...args) => {
    if (validate) {
      validate = false;
      timer = setTimeout(() => {
        validate = true;
        fn.apply(this, args);
      }, delay);
    }
  }

  //立即取消
  resultFunc.cancel = () => {
    clearTimeout(timer)
    timer = null;
    validate = true;
  }

  return resultFunc;

}


// ///**********************************【更好的版本】******************************//
// //防抖
// function debounce(fn, delay=500, immediate = false) {
//   let timer = null;

//   if(immediate) {
//     return (...args) => {
//       if(!timer) {
//         fn.apply(this, args);
//       } else {
//         clearTimeout(timer);
//       }
//       timer = setTimeout(() => {
//         clearTimeout(timer);
//         timer = null;
//       }, delay);
//     }
//   }

//   return (...args) => {
//     if(timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//       clearTimeout(timer);
//       timer = null;
//     }, delay);
//   }
// }

// //节流
// function throttle(fn, delay = 500, immediate= false) {
//   let timer = null;

//   if(immediate) {
//     return (...args) => {
//       if(!timer) {
//         fn.apply(this, args);
//         timer = setTimeout(() => {
//           clearTimeout(timer);
//           timer = null;
//         }, delay);
//       }

//     }
//   }

//   return (...args) => {
//     if(!timer) {
//       timer = setTimeout(() =>{
//         fn.apply(this, args);
//         clearTimeout(timer);
//         timer = null;
//       }, delay);
//     }
//   }
// }



// //防抖
// function debounce(fn, delay = 500, immediate = false) {
//   let timer = null;
//   if(immediate) {
//     return (...args) => {
//       if(timer) {
//         clearTimeout(timer);
//       } else {
//         fn.apply(this, args);
//       }

//       timer = setTimeout(() =>{
//         clearTimeout(timer);
//         timer = null;
//       }, delay);
//     }
//   }

//   return (...args) => {
//     if(timer) {
//       clearTimeout(timer);
//       timer = null;
//     }

//     timer = setTimeout(() =>{
//       fn.apply(this, args);
//       clearTimeout(timer);
//       timer = null;
//     }, delay);
//   }
// }


//节流
function throttle(fn, delay = 500, immediate = false) {
  let timer = null;
  if(immediate) {
    return (...args) => {
      if(!timer) {
        fn.apply(this, args);
        timer = setTimeout(() =>{
          clearTimeout(timer);
          timer = null;
        }, delay);
      }
    }
  }

  return (...args) => {
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  }
}