// 对象池
import pool from './Pool';

/**
 * Model 基类
 */
class Model {
  constructor(option) {
    this.name = option.name;
  }
  // 设置名称
  setName(name) {
    return this.name = name;
  }
  // 获得名称
  getName() {
    return this.name;
  }
  // 基础的打印方法
  toString() {
    return `Model:${this.name}`;
  }
  // 回收
  recover() {
    // TODO:回收对象
  }
}

/**
 * 棋子数据
 */
class PieceModel extends Model {
  constructor(option) {
    super(option);
    // 图片位置
    this.x = option.x;
    this.y = option.y;
    // 棋盘位置
    this.a = option.a;
    this.b = option.b;
    this.radius = option.radius;
    this.lineColor = option.lineColor;
    this.lineWidth = option.lineWidth;
    // black || white
    this.type = option.type;
  }
}
/**
 * 棋子列表数据
 */
class PieceListModel extends Model {
  constructor(option) {
    super(option);
    this.pieceList = [];
  }
}
/**
 * 棋盘数据
 */
class ChessboardModel extends Model {
  constructor(option) {
    super(option);
    this.x = option.x;
    this.y = option.y;
    this.width = option.width;
    this.height = option.height;
    this.lineColor = option.lineColor || '#333333';
    this.lineWidth = option.lineWidth || 1;
  }
}



export {
  Model,
  PieceModel,
  PieceListModel,
  ChessboardModel,
}
