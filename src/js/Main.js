import { run } from './Util';
import {
  Contraller,
  PieceContraller,
  ChessboardContraller,
} from './Contrallers';
import {
  View,
  PieceView,
  ChessboardView,
} from './Views';
import {
  Model,
  PieceModel,
  ChessboardModel,
} from './Models';
const canvas = document.getElementById('canvas-view');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasGap = 20;

// hello
const hello = new Contraller(new View(new Model({ name: 'Welcome to this game!' })));
console.info(hello.getName());

// 棋盘
const chessboard = new Contraller(new ChessboardView(new ChessboardModel({
  x: canvasGap,
  y: canvasGap,
  width: canvasWidth - canvasGap * 2,
  height: canvasHeight - canvasGap * 2,
  lineColor: '#ddd',
  lineWidth: 0.1,
  name: 'chessboard'
})));

// 棋子列表
let pieceList = [];


//  动画循环
function animation() {
  // 清空棋盘
  ctx.clearRect(0,0,canvasWidth,canvasHeight)
  // 绘制棋盘
  chessboard.$view.draw(ctx);
  // 绘制棋子
  for (onePiece of pieceList) {
    onePiece.draw(ctx);
  }
  // some step
  run(animation);
}
run(animation);

// 控制面板 - 开始
document.getElementById('play').addEventListener('click', () => {

});
// 控制面板 - 重玩
document.getElementById('replay').addEventListener('click', () => {

});
// 控制面板 - 悔棋
document.getElementById('withdraw').addEventListener('click', () => {

});
// 控制面板 - 退出游戏
document.getElementById('signout').addEventListener('click', () => {

});
// 屏幕点击事件
document.getElementById('canvas-view').addEventListener('click', (event) => {
  const clickPoint = {
    x: event.layerX,
    y: event.layerY
  }
  console.log(clickPoint);
});
