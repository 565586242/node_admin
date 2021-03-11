// 判断是不是空对象
exports.isEmptyObject = (obj) => {
  if (typeof obj != 'object') return false;
  for (var i in obj) {
    return false;
  }
  return true;
}