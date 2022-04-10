const _ = require('../lodash');


// # 从[J ~ K]数组中选取N个随机数
// ### 参数为 J, K, N
// ### N 小于 K-J
// ### 结果不能包含重复数字
let arr = ['l', 'q','w','q','j','g','q','q']

function pickOnlyArr(j, k, n, arr) {
    const a = _.chain(_.range(j, k)).shuffle().take(n).map(i => arr[i]).value();
    // let result = []; 
    // a.forEach((i) => result.push(arr[i]))
    return a;
}
console.log(pickOnlyArr(1,7,2, arr))

//  [{code:'a', b:'西瓜', c:'3'},
// # {code:'b', b:'苹果', c:'13'},
// # {code:'c', b:'葡萄', c:'23'},
// # {code:'d', b:'桃子', c:'33'},
// # {code:'e', b:'樱桃', c:'331'},
// # {code:'f', b:'哈密瓜', c:'43'},
// # ]
// # 输出
// # {
// # a: '西瓜'，
// # b: '苹果'
// # …
// # }


const rawList = [
    {code:'a', b:'西瓜', c:'3'},
    {code:'b', b:'苹果', c:'13'},
    {code:'c', b:'葡萄', c:'23'},
    {code:'d', b:'桃子', c:'33'},
    {code:'e', b:'樱桃', c:'331'},
    {code:'f', b:'哈密瓜', c:'43'},
]

// const newArr = rawList.reduce((prev, cur) => {
//     prev[cur.code] = cur.b
//     return prev
// }, {})

//自己解法
const result = _.reduce(rawList, (prev, cur) => {
    prev[cur.code] = cur.b
    return prev
}, {})

console.log(result);

//解法一
console.log(_.chain(rawList).map(d=>[d.code, d.b]).fromPairs().value())
//解法二
console.log(_.chain(rawList).keyBy('code').mapValues('b').value())

