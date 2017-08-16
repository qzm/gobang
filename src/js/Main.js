import { run } from './Util';
import {
  Contraller,
  PieceContraller,
  ChessboardContraller,
  PieceListContraller,
} from './Contrallers';
import {
  View,
  PieceView,
  ChessboardView,
  PieceListView,
} from './Views';
import {
  Model,
  PieceModel,
  ChessboardModel,
  PieceListModel,
} from './Models';
const canvas = document.getElementById('canvas-view');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasGap = 20;
let player = 'white';
let isGameOver = true;
// hello
const hello = new Contraller(new View(new Model({ name: 'Welcome to this game!' })));
console.info(hello.getName());

// 棋盘
const chessboard = new ChessboardContraller(new ChessboardView(new ChessboardModel({
  x: canvasGap,
  y: canvasGap,
  width: canvasWidth - canvasGap * 2,
  height: canvasHeight - canvasGap * 2,
  lineColor: '#ddd',
  lineWidth: 1,
  name: 'chessboard'
})));

// 棋子列表
let pieceList = '';

console.log(pieceList);
//  动画循环
function animation() {
  // 清空棋盘
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // 绘制棋盘
  chessboard.$view.draw(ctx);
  // 绘制棋子列表
  if (pieceList) {
    pieceList.$view.draw(ctx);
  }
  // some step
  run(animation);
}
run(animation);

// 控制面板 - 开始
document.getElementById('play').addEventListener('click', () => {
  isGameOver = false;
  pieceList = null;
  pieceList = new PieceListContraller(new PieceListView(new PieceListModel({
  name: 'PieceList'
})));
});
// 控制面板 - 重玩
document.getElementById('replay').addEventListener('click', () => {
  isGameOver = false;
  pieceList = null;
  pieceList = new PieceListContraller(new PieceListView(new PieceListModel({
  name: 'PieceList'
})));

});
// 控制面板 - 悔棋
document.getElementById('withdraw').addEventListener('click', () => {
  if (pieceList) {
    pieceList.pop();
  }
});
// 控制面板 - 退出游戏
document.getElementById('signout').addEventListener('click', () => {

});
let aaa = true;
let type = 'black';
// 屏幕点击事件
document.getElementById('canvas-view').addEventListener('click', (event) => {
  if (aaa) {
    type = 'black';
    aaa = false;
  } else {
    type = 'white';
    aaa = true;
  }
  let piece = new PieceContraller(new PieceView(new PieceModel({
    type,
    x: event.layerX,
    y: event.layerY,
    radius: 15,
    lineColor: '#333'
  })));
  // console.log(piece);
  if (pieceList) {
    pieceList.push(piece);
  }
  // piece.$view.draw(ctx);
});
