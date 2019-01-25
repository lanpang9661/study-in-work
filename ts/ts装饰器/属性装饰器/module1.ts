
function announce (target, key, descriptor) {
    // 存储属性值
    let _val = descriptor.initializer
  
    const get = function () {
      return _val
    }
  
    const set = function (newVal) {
      console.log(`切换武器 ${newVal}`)
      _val = newVal
    }
  
    return {
      get,
      set,
      enumerable: true,
      configurable: true
    }
  }
  
  class Somebody {
    @announce
    leftArm = ''
    @announce
    rightArm = ''
  
    constructor () {
    }
  }
  
  const s = new Somebody()
  s.leftArm = 'akm'
  s.rightArm = 'm416'