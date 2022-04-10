//防抖-在规定时间内只出发一次，如果在计时达到前触发则重新计时
function debounce(fn, delay=500) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}



function fn() {
    console.log('我被触发了');
}

let debounce = function (fn, delay) {
    let time = null
    return function(...args) {
        clearTimeout(time)
        time = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

let throttle = function (fn, delay) {
    let old = new Date()
    return function(...args) {
        let now = new Date()
        if(now - old >= delay) {
            fn(...args)
            old = new Date()
        }
    }
}

document.querySelector('.btn1').addEventListener('click', debounce(fn, 1000))
document.querySelector('.btn2').addEventListener('click', throttle(fn, 1000))
