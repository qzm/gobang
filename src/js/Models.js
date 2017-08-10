// 对象池
import pool from './Pool';

/**
 * Model 基类
 */
class Model {
  constructor(option) {
    this.name = 'Name is not set!';
    Object.assign(this, option);
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

  }
}

class PieceModel extends Model {
  constructor(option) {
    super(option);
  }
}

export {
  Model,
  PieceModel,
}
