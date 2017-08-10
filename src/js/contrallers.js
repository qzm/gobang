// 对象池
import pool from './Pool';

/**
 * Contraller 基类
 */
class Contraller {
  constructor(view) {
    this.$view = view;
    this.name = this.$view.name;
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
    return `Contraller:${this.name}`;
  }
}
/**
 * 棋子控制器
 */
class PieceContraller extends Contraller {
  constructor(view) {
    super(view);
  }
}

export {
  Contraller,
  PieceContraller,
}
