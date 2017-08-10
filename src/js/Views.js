// 对象池
import pool from './Pool';

/**
 * View 基类
 */
class View {
  // 构造器
  constructor(model) {
    this.$model = model;
    this.name = model.name;
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
    return `View:${this.name}`;
  }
  // 绘制方法
  draw() {
    console.error(`还未定义【${this.name}】的绘制方法`);
  }
  // 回收
  recover() {
    // TODO:回收对象
  }

}
/**
 * 棋子的视图
 * @param {PiectModel} model
 */
class PieceView extends View {
  constructor(pieceModel) {
    super(pieceModel);
  }
  draw() {
    console.log('绘制棋子');
  }
}

export {
  View,
  PieceView,
}
