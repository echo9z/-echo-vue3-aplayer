export function useFormatNumber (
  num: number, decimals: number, decimal: string, separator: string,
  prefix: string, suffix: string
){
  // 保留decimals 位小数点
  let numStr:string = num.toFixed(decimals);
  numStr += '';
  const x = numStr.split('.');// 按照小数点进行分割
  let x1 = x[0]; // 先取出 小数点前面几位 [0, 00]
  const x2 = x.length > 1 ? decimal + x[1] : ''; // 分割出是否有
  const rgx = /(\d+)(\d{3})/; // \d+ 出现数字一次或多次，\d{3}三个任意的数字
  if (separator && !isNumber(separator)) { // 是否传入分隔符，同时判断是否传入的是一个数字，是数字返回false
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2'); // 比如传入 1000 替换为 1,000
    }
  }
  // ￥ 1,000 .00 rmb
  return prefix + x1 + x2 + suffix;
}

export function isNumber(val: string) {
  return !isNaN(parseFloat(val))
}