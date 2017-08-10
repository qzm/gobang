/**
 * 创建对象（精灵）池
 * @param {Int} 对象池大小
 * @return {Object} 对象（精灵）池
 */
function ObjectPool() {
  let objectPool = [];
  return {
    // 初始化对象池
    init(size = 100) {
      while (size--) {
        objectPool.push({});
      }
      return objectPool;
    },
    // 创建新的对象
    create() {
      if (objectPool.length) {
        return objectPool.shift();
      } else {
        objectPool.push({});
      }
    },
    // 销毁整个对象池
    destory() {
      objectPool = [];
    },
    // 回收一个对象
    recover(obj) {
      objectPool.push(obj);
    },
    // 获得大小
    size() {
      return objectPool.length();
    }
  }
}

/**
 * 判断当前是否胜利
 * @param {Object} gobangData 棋盘数据
 * @return {Boolean} 是否胜利
 */
function judgeSuccess(gobangData) {
  return false;
}

/**
 * 闭包缓存纯函数的结果
 * @param {Function} fn 需要缓存的函数
 * @return {Function} 修改后的函数
 */
function cached(fn) {
  const cache = Object.create(null);
  return ((...argv) => {
    const key = Array.prototype.join.call(argv, '_');
    const hit = cache[key];
    // eslint-disable-next-line
    return hit || (cache[key] = Reflect.apply(fn, null, argv));
  });
}

/**
 * 格式工厂，生成判断的函数
 * @param {String} type
 * @return {Function} 判断函数
 */
function typeFactory(type) {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}

/**
 * 判断数据是否为Array
 * @param {*} obj
 * @return {Boolean} 是否为Array
 */
const isArray = typeFactory('Array');

/**
 * 判断数据是否为Object
 * @param {*} obj
 * @return {Boolean} 是否为Object
 */
const isObject = typeFactory('Object');

/**
 * 判断数据是否为Function
 * @param {*} obj
 * @return {Boolean} 是否为Function
 */
const isFunction = typeFactory('Function');

/**
 * 判断数据是否为Number
 * @param {*} obj
 * @return {Boolean} 是否为Number
 */
const isNumber = typeFactory('Number');

/**
 * 判断数据是否为RegExp
 * @param {*} obj
 * @return {Boolean} 是否为RegExp
 */
const isRegExp = typeFactory('RegExp');

/**
 * 判断数据是否为String
 * @param {*} obj
 * @return {Boolean} 是否为String
 */
const isString = typeFactory('String');

/**
 * 判断数据是否为Boolean
 * @param {*} obj
 * @return {Boolean} 是否为Boolean
 */
const isBoolean = typeFactory('Boolean');

/**
 * 判断数据是否为Undefined
 * @param {*} obj
 * @return {Boolean} 是否为Undefined
 */
const isUndefined = typeFactory('Undefined');

/**
 * 判断数据是否为Null
 * @param {*} obj
 * @return {Boolean} 是否为Null
 */
const isNull = typeFactory('Null');

/**
 * 判断数据是否为Symbol
 * @param {*} obj
 * @return {Boolean} 是否为Symbol
 */
const isSymbol = typeFactory('Symbol');

/**
 * 判断数据是否为Map
 * @param {*} obj
 * @return {Boolean} 是否为Map
 */
const isMap = typeFactory('Map');

/**
 * 判断数据是否为Set
 * @param {*} obj
 * @return {Boolean} 是否为Set
 */
const isSet = typeFactory('Set');

/**
 * 判断数据是否为WeakMap
 * @param {*} obj
 * @return {Boolean} 是否为WeakMap
 */
const isWeakMap = typeFactory('WeakMap');

/**
 * 判断数据是否为WeakSet
 * @param {*} obj
 * @return {Boolean} 是否为WeakSet
 */
const isWeakSet = typeFactory('WeakSet');


export {
  ObjectPool,
  judgeSuccess,
  typeFactory,
  isArray,
  isObject,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isBoolean,
  isUndefined,
  isNull,
  isSymbol,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
};
