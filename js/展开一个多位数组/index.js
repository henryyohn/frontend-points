
/**
 * 展开一个多位数组
 * @param {*} arr 
 */
function flatArray(arr) {
    if ((Array.isArray(arr))) {
        let newArray = [];
        for(let key in arr) {
            if (Array.isArray(arr[key])) {
                newArray = newArray.concat(flatArray(arr[key]));
            } else {
                newArray.push(arr[key])
            }
        }
        return newArray;
    } else {
        return arr;
    }
}