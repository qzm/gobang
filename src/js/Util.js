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
 * 生成一个 15 * 15 的二维数组
 */
function makeMatrix() {
    // 初始化矩阵
  let matrix = [];
  let counter = 15;
  while (counter--) {
    matrix.push((() => {
      let arr = [];
      arr.length = 15;
      return arr;
    })());
  }
  return matrix;
}
/**
 * 将所有棋子的位置，转换成二维数组
 * @param {Array} list
 */

function toMatrix(list) {
  // console.log(list);
  // 生成一个空白的二维数组
  let matrix = makeMatrix();
  // 将对象填充进去
  list.forEach((onePiece) => {
    matrix[onePiece.$view.$model.a][onePiece.$view.$model.b] = onePiece;
  });
  // console.log(matrix);
  return matrix;
}

/**
 * 横向是否有连续五颗棋子
 * @param {Array} matrix
 * @param {Object} lastPiece
 * @return {Boolean} 是否存在胜利
 */
function isVerticalSuccess(matrix, lastPiece) {
  const horizon = lastPiece.$view.$model.b;
  let black = 0;
  let white = 0;
  let left = lastPiece.$view.$model.a - 5;
  let right = lastPiece.$view.$model.a + 5;
  left < 0 ? left = 0 : left = left;
  right > 14 ? right = 14 : right = right;
  while (left < right - 4) {
    if (matrix[left][horizon]) {
      if (matrix[left][horizon].$view.$model.type === 'black') {
        white = 0;
        black++;
      } else if (matrix[left][horizon].$view.$model.type === 'white') {
        black = 0;
        white++;
      }
    } else {
      white = 0;
      black = 0;
    }
    // 往右移动
    left++;
  }
  return white >= 5 || black >= 5;
}

/**
 * 纵向是否有连续五颗棋子
 * @param {Array} matrix
 * @param {Object} lastPiece
 * @return {Boolean} 是否存在胜利
 */
function isHorizontalSuccess(matrix, lastPiece) {
  const vertical = lastPiece.$view.$model.a;
  let black = 0;
  let white = 0;
  let up = lastPiece.$view.$model.b - 5;
  let down = lastPiece.$view.$model.b + 5;
  up < 0 ? up = 0 : up = up;
  down > 14 ? down = 14 : down = down;
  while (up < down - 4) {
    if (matrix[vertical][up]) {
      if (matrix[vertical][up].$view.$model.type === 'black') {
        white = 0;
        black++;
      } else if (matrix[vertical][up].$view.$model.type === 'white') {
        black = 0;
        white++;
      }
    } else {
      white = 0;
      black = 0;
    }
    // 往右移动
    up++;
  }
  return white >= 5 || black >= 5;
}

/**
 * 左上到右下是否有连续五颗棋子
 * @param {Array} matrix
 * @param {Object} lastPiece
 * @return {Boolean} 是否存在胜利
 */
function isLeftUpToRightBottomSuccess(matrix, lastPiece) {
  const isABigerThanB = lastPiece.$view.$model.a > lastPiece.$view.$model.b;
  let black = 0;
  let white = 0;
  let xMin = lastPiece.$view.$model.a - 5;
  let xMax = lastPiece.$view.$model.a + 5;
  let yMin = lastPiece.$view.$model.b - 5;
  let yMax = lastPiece.$view.$model.b + 5;
  console.log('a', lastPiece.$view.$model.a, 'b', lastPiece.$view.$model.b);
  while (xMin < 0 || yMin < 0) {
    xMin++;
    yMin++;
  }
  while (xMax > 14 || yMax > 14) {
    xMax--;
    yMax--;
  }
  while (xMin < xMax && yMin < yMax) {
    console.log('xMin', xMin, 'yMin', yMin, 'xMax', xMax, 'yMax', yMax, 'black', black, 'white', white);
    if (matrix[xMin][yMin]) {
      if (matrix[xMin][yMin].$view.$model.type === 'black') {
        white = 0;
        black++;
        if (black >= 5) return true;
      } else if (matrix[xMin][yMin].$view.$model.type === 'white') {
        black = 0;
        white++;
        if (white >= 5) return true;
      }
    } else {
      white = 0;
      black = 0;
    }
    console.log('xMin', xMin, 'yMin', yMin, 'xMax', xMax, 'yMax', yMax, 'black', black, 'white', white);

    xMin++;
    yMin++;
  };
  return white >= 5 || black >= 5;
}

/**
 * 左上到右下是否有连续五颗棋子
 * @param {Array} matrix
 * @param {Object} lastPiece
 * @return {Boolean} 是否存在胜利
 */
function isRightUpToLeftBottomSuccess(matrix, lastPiece) {
  let sum = 0;
  return false;
}

/**
 * 判断当前是否胜利
 * @param {Object} gobangData 棋盘数据
 * @return {Boolean} 是否胜利
 */
function judgeSuccess(pieceList) {
  const list = pieceList.$view.$model.pieceList;
  if (isArray(list) && list.length >= 1) {
    // 生成棋盘矩阵
    const matrix = toMatrix(list);
    // 最后一枚棋子位置
    const lastPiece = list[list.length - 1];
    // 横向是否有连续五个棋子
    const vs = isVerticalSuccess(matrix, lastPiece);
    // 纵向是否有连续五颗棋子
    const hs = isHorizontalSuccess(matrix, lastPiece);
    // 左上到右下是否有连续五颗棋子
    const urrbs = isLeftUpToRightBottomSuccess(matrix, lastPiece);
    // 左上到右下是否有连续五颗棋子
    const rulbs = isRightUpToLeftBottomSuccess(matrix, lastPiece);
    if (vs || hs || urrbs || rulbs) {
      return true;
    }
  }
  return false;
}

/**
 * 封装requestAnimationFrame
 */
const run = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

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

/**
 * 通过点击的位置，判断落子的位置
 * @param {Object} clickPoint {x,y}
 * @param {Int} areaWidth 棋盘的Width
 * @param {Int} areaHeight 棋盘的Height
 */
const getPieceLocation = cached((x, y, areaWidth, areaHeight, gap) => {
  const widthStep = (areaWidth - gap * 2) / 15
  const heightStep = (areaHeight - gap * 2) / 15
  console.log(widthStep, heightStep);
  const a = Math.floor((x - gap) / widthStep);
  const b = Math.floor((y - gap) / heightStep);
  console.log({ x, y, a, b});
  return {
    x: (a + 0.5 ) * widthStep + gap,
    y: (b + 0.5 ) * heightStep + gap,
    a,
    b
  };
});

/**
 * 棋子是否已经存在棋盘中
 * @param {Object} pieceList
 * @param {Object} point
 */
function notInChessboard(pieceList, point) {
  const list = pieceList.$view.$model.pieceList;
  if (isArray(list)) {
    let isNotInChessboard = true;
    list.forEach((onePiece) => {
      if (onePiece.$view.$model.a === point.a && onePiece.$view.$model.b === point.b) {
        isNotInChessboard = false;
      }
    });
    return isNotInChessboard;
  }
  throw 'pieceList不是数组';
}

export {
  run,
  cached,
  getPieceLocation,
  notInChessboard,
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
