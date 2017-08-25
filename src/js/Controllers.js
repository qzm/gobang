// 对象池
import pool from './Pool';

/**
 * Controller 基类
 */
class Controller {
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
    return `Controller:${this.name}`;
  }
  // 回收
  recover() {
    // TODO:回收对象
  }

}
/**
 * 棋子控制器
 */
class PieceController extends Controller {
  constructor(view) {
    super(view);
  }
}
/**
 * 棋子数组控制器
 */
class PieceListController extends Controller {
  constructor(view) {
    super(view);
  }
  // 新增一枚棋子
  push(pieceCtrl) {
    this.$view.$model.pieceList.push(pieceCtrl)
  }
  // 悔棋
  pop() {
    this.$view.$model.pieceList.pop();
  }
}

/**
 * 棋盘控制器
 */
class ChessboardController extends Controller {
  constructor(view) {
    super(view);
  }
}

export {
  Controller,
  PieceController,
  PieceListController,
  ChessboardController,
}
