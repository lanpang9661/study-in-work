/**
 * 判断字符串是否为空值或者空字符串
 */
function isEmpty(source) {
  var isEmpty = true
  if ((source == undefined) || (source == null) || (source == "")) {
    isEmpty = true
  }
  else {
    isEmpty = false
  }
  return isEmpty
}

/**
 * 对于空字符串直接返回""进行非空处理的方法
 */
function nonNull(source) {
  var stringReturn = source

  if (isEmpty(source)) {
    stringReturn = ""
  }
  else {
    stringReturn = source
  }
  return stringReturn
}

/**
 * 判断是否每一个字符都是中文
 */
function isEveryWordChinese(sourceString) {
  var isEveryWordChinese = false
  // let regex = "[\u4E00-\u9FA5]+"
  if (!isEmpty(sourceString)) {
    for (var index in sourceString) {
      var currentChar = sourceString[index]
      if (/^[\u3220-\uFA29]+$/.test(currentChar)) {
        isEveryWordChinese = true
      } else {
        isEveryWordChinese = false
        break
      }
    }
  }
  return isEveryWordChinese
}

/**
 * 判断电话号码是否有效
 */
function isValidPhoneNumber(phoneNumberString) {
  var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  return reg.test(phoneNumberString)
}

module.exports = {
  isEmpty: isEmpty,
  nonNull: nonNull,
  isEveryWordChinese: isEveryWordChinese,
  isValidPhoneNumber: isValidPhoneNumber,
}