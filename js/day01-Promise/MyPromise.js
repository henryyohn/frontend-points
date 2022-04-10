const BasePromise = require('./BasePromise.js')

// const BPromise = new BasePromise((resolve, reject) => {
//   console.log('==000=', new Date().getTime())
//   setTimeout(() => {
//     console.log('===01====')
//     resolve('01-success')
//     // reject('01-fail')
//   }, 2000)
// })

// BPromise.then(result => {
//   console.log('==222=', new Date().getTime())
//   console.log('===成功回调===', result)
// }, data => {
//   console.log('==222=', new Date().getTime())
//   console.log('===失败回调===', data)
// })


console.log('===start===');
new BasePromise((resolve, reject) =>{
  console.log('==start-promise-count=')
  setTimeout(() => {
    if(true) {
        resolve("success===00====")
    } else {
      reject("fali===00====")
    }
  }, 3000)
})
// .then(res => console.log('=then1==', res), err => console.log("==then1=", err)).then(result => console.log("9999",result), error => console.log(error))
.then("==999000===").then(result => console.log("9999",result), error => console.log(error))
console.log('===end===');
