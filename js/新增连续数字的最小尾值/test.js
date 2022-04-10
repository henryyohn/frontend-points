const original = [
  {
    name: '1号楼'
  },
  {
    name: '2号楼'
  },
  {
    name: '7号楼'
  },
  {
    name: '门口'
  },
  {
    name: '4号楼'
  },
  {
    name: '3号楼'
  },
  {
    name: 'A号楼'
  },
  {
    name: '5号楼'
  },
]

function addMin(originalArr) {
    // 获取index
    let indexArr = [];
    for (let i = 0; i < originalArr.length; i++) {
      const name = originalArr[i].name;
      //找出“号楼“之前的值
      const val = name.split('号楼')[0];
      //如果能成功转数字，则保存
      const n = Number(val);
      if(!isNaN(n)) {
        indexArr.push(n)
      }
    }
    console.log(indexArr)

    let originLength = indexArr.length;
    // 升序排序
    indexArr = indexArr.sort((a, b) => a - b );
    // 判读新增数(根据数组index和当前对应值判断)
    let addIndex;
    for (let i = 0; i < indexArr.length; i++) {
      const value = indexArr[i];
      if(value > i + 1) {
        addIndex = i + 1;
        break;
      }
    }
    if(addIndex === undefined) {
      addIndex = originLength+1;
    }
    const resultArr = [...originalArr, {name: addIndex+'号楼'}];
    
  console.log(`新增的index=${addIndex}, 新的数组:`);
  resultArr.forEach(item => console.log(item))
}

addMin(original);

