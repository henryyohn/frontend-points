(function(window) {
  //接口-对外提供的方法---初始化
  function myMobile(selector) {
    return myMobile.prototype._init(selector)
  }

  myMobile.prototype = {
    _init: function(selector) {
      if(typeof selector === 'string') {
        this.ele = window.document.querySelector(selector)
        return this
      }
    },

    //单机
    tap: function(handler) {
      //touchFn => 回调处理-记录
      this.ele.addEventListener('touchstart', touchFn)
      //结束
      this.ele.addEventListener('touchend', touchFn)

      let startTime, endTime;

      function touchFn(e) {
        console.log(e);
        switch (e.type) {
          case 'touchstart':
            startTime = new Date().getTime();
            break;
          case 'touchend':
            endTime = new Date().getTime();
            if(endTime - startTime < 200) {
              handler.call(this, e)
            }
            break;
        
          default:
            break;
        }
      }
    },

    //单机
    longTap: function(handler) {
      //touchFn => 回调处理-记录
      this.ele.addEventListener('touchstart', touchFn)
      //结束
      this.ele.addEventListener('touchend', touchFn)
      this.ele.addEventListener('touchmove', touchFn)

      let timerId;

      function touchFn(e) {
        console.log(e);
        switch (e.type) {
          case 'touchstart':
            timerId = setTimeout(() => {
              handler.call(this, e)
            }, 2000);
            break;
          case 'touchmove': 
            clearTimeout(timerId)
            break;
          case 'touchend':
            clearTimeout(timerId)
            break;
        
          default:
            break;
        }
      }
    },

    //左滑
    slideLeft: function(handler) {
      //touchFn => 回调处理-记录
      this.ele.addEventListener('touchstart', touchFn)
      //结束
      this.ele.addEventListener('touchend', touchFn)

      let startX, startY, endX, endY;
      function touchFn(e) {
        let firstTouch = e.changedTouches[0];
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX
            startY = firstTouch.pageY
            break;
          case 'touchend':
            endX = firstTouch.pageX
            endY = firstTouch.pageY
            if(Math.abs(endX - startX) >= Math.abs(endY - startY)
            && startX - endX >= 150) {
              handler.call(this, e)
            }
            break;
          default:
            break;
        }
      }
    }

  }

  window.$ = window.myMobile = myMobile;
})(window)





function promiseAll(list) {
  return new Promise((resove, reject) => {
    if (!list || !list.length) {
      reject('no task');
    }
    let result = [];
    for (let index = 0; index < list.length; index++) {
      const task = list[index];
      task.then((res) => {
        result.push(res); 
        result.length === list.length && resolves(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}


function myTrim(str) {
  
  const i = removeFirstSpace(str)
  
  const temp = str.reverse();
}

function removeFirstSpace(params) {
  const index = getSpaceIndex(temp)
  if(index === 0) {
    str.replace(' ', '')
    myTrim(str)
  } else {
    return index
  }
}

function getSpaceIndex(str) {
  return str.indexOf(' ')
}