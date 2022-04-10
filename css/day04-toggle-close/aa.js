let result = 0;
var countNodes = function (root) {
  if (root && root.val !== null) {
    result++;
    if (root.left !== null) {
      countNodes(root.left);
    }
    if (root.right !== null) {
      countNodes(root.right);
    }
  }
  return result;
};