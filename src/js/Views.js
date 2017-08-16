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
  }
}
/**
 * 棋子数组的视图
 * @param {PiectModel} model
 */
class PieceListView extends View {
  constructor(pieceListModel) {
    super(pieceListModel);
  }
  // 绘制所有棋子
  draw(ctx) {
    this.$model.pieceList.forEach(onePiece => onePiece.$view.draw(ctx));
  }
}
/**
 * 棋盘的视图
 * @param {chessboardModel} model
 */
class ChessboardView extends View {
  constructor(chessboardModel) {
    super(chessboardModel);
  }
  // 画线
  drwaLine(canvas, pFrom, pTo, color, width) {
    canvas.beginPath();
    canvas.fillStyle = color;
    canvas.lineWidth = width;
    canvas.moveTo(pFrom.x, pFrom.y);
    canvas.lineTo(pTo.x, pTo.y);
    canvas.closePath();
    canvas.stroke();
  }
  // 画横线
  drawVerticalLine(canvas, pFrom, pTo) {
    this.drwaLine(canvas, pFrom, pTo, this.$model.lineColor, this.$model.lineWidth);
  }
  // 画竖线
  drawHorizontalLine(canvas, pFrom, pTo) {
    this.drwaLine(canvas, pFrom, pTo, this.$model.lineColor, this.$model.lineWidth);
  }
  // 背景图
  drawBackground(canvas, color) {

  }
  // 绘制
  draw(canvas) {
    const stepX = this.$model.width / 15;
    const stepY = this.$model.height / 15;
    for (var i = 1; i < 16; i++) {
      this.drawVerticalLine(canvas, {
        x: this.$model.x,
        y: stepX * i
      }, {
        x: this.$model.width + this.$model.x,
        y: stepX * i
      });
      this.drawHorizontalLine(canvas, {
        x: stepY * i,
        y: this.$model.y
      }, {
        x: stepY * i,
        y: this.$model.height + this.$model.y
      });
    }
    // 背景

  }
}

export {
  View,
  PieceView,
  PieceListView,
  ChessboardView,
}
