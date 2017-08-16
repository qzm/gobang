import { run, getPieceLocation, cached } from './Util';
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
// 简单的单向数据绑定
const mvvm = {
  playerMsg: ''
};

// 设置Property
const setProperty = function (mvvm, bindModel) {
  Object.defineProperty(mvvm, bindModel, {
    enumerable: true,
    get: function () {
      return document.querySelector('[q-model=' + bindModel + ']').value;
    },
    set: function (newValue) {
      // 赋值到Dom
      let allBindingElement = document.querySelectorAll('[q-model=' + bindModel + ']');
      for (let i = 0; i < allBindingElement.length; i++) {
        // 修改value
        allBindingElement[i].value = newValue;
        // 修改innerText
        try {
          allBindingElement[i].innerText = newValue;
        } catch (err) { }
      }
    }
  });
}
// 绑定数据
window.onload = function() {
  for (let bindModel in mvvm) {
    if (mvvm.hasOwnProperty(bindModel)) {
      setProperty(mvvm, bindModel);
    }
  }
}


const canvas = document.getElementById('canvas-view');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasGap = 20;
let player = 0;
let isGameStart = false;
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

function setPlayer() {
  if (player) {
    mvvm.playerMsg = '【黑方】执棋';
    player = 0;
  } else {
    mvvm.playerMsg = '【白方】执棋';
    player = 1;
  }
}

// 控制面板 - 开始
const playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
  isGameStart = true;
  isGameOver = false;
  pieceList = null;
  player = 0;
  pieceList = new PieceListContraller(new PieceListView(new PieceListModel({
    name: 'PieceList'
  })));
  playButton.innerText = '重新开始';
});

// 控制面板 - 悔棋
document.getElementById('withdraw').addEventListener('click', () => {
  if (pieceList && pieceList.$view.$model.pieceList.length > 0) {
    pieceList.pop();
    setPlayer();
  }
});
// 控制面板 - 退出游戏
document.getElementById('signout').addEventListener('click', () => {
  alert('关闭浏览器就好了呀！');
});

// 屏幕点击事件
document.getElementById('canvas-view').addEventListener('click', (event) => {
  if (isGameStart && !isGameOver) {
    setPlayer();
    const point = getPieceLocation(
      event.layerX,
      event.layerY,
      canvasWidth,
      canvasHeight
    );
    let piece = new PieceContraller(new PieceView(new PieceModel({
      type: player ? 'balck' : 'white',
      x: point.x,
      y: point.y,
      radius: 15,
      lineColor: '#333'
    })));
    // console.log(piece);
    if (pieceList) {
      pieceList.push(piece);
    }
    // piece.$view.draw(ctx);
  } else {
    alert('请开始游戏');
  }
});
