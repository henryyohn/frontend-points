const allElements = document.getElementsByTagName("*");

const result = {};

for (const element of allElements) {
  const tagEle = element.tagName.toLowerCase();
  if(!result[tagEle]) {
    result[tagEle] = 1;
  } else {
    result[tagEle] +=1;
  }
}

console.log(result);