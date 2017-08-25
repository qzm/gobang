// import 'babel-polyfill';
import { run, getPieceLocation, cached, notInChessboard, judgeSuccess } from './Util';
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
import CONFIG from './config';

// service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
console.log('SW TEST 2');
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
let player = CONFIG.BLACK;
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
  lineColor: CONFIG.LINE_COLOR,
  lineWidth: 1,
  name: 'chessboard'
})));

// 棋子列表
let pieceList = '';
// 手持的棋子
let handPiece = new PieceContraller(new PieceView(new PieceModel({
  radius: 15,
  lineColor: CONFIG.BLACK_COLOR
})));
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
  // 手持的棋子
  if (isGameStart) {
    handPiece.$view.draw(ctx);
  }
  // some step
  run(animation);
}
run(animation);

function setPlayer() {
  if (player === CONFIG.BLACK) {
    mvvm.playerMsg = CONFIG.lang.CHARGE_BLACK;
    player = CONFIG.WHITE;
  } else {
    mvvm.playerMsg = CONFIG.lang.CHARGE_WHITE;
    player = CONFIG.BLACK;
  }
}

// 控制面板 - 开始
const playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
  isGameStart = true;
  isGameOver = false;
  pieceList = null;
  player = CONFIG.WHITE;
  pieceList = new PieceListContraller(new PieceListView(new PieceListModel({
    name: 'PieceList'
  })));
  playButton.innerText = CONFIG.lang.REPLAY;
});

// 控制面板 - 悔棋
document.getElementById('withdraw').addEventListener('click', () => {
  if (!isGameOver && pieceList && pieceList.$view.$model.pieceList.length > 0) {
    pieceList.pop();
    setPlayer();
  }
});
document.getElementById('canvas-view').addEventListener('mousemove', (event) => {
  // console.log(event.layerX, event.layerY);
  handPiece.$view.$model.x = event.layerX;
  handPiece.$view.$model.y = event.layerY;
  handPiece.$view.$model.type = player === CONFIG.BLACK ? CONFIG.WHITE : CONFIG.BLACK;
});
// 控制面板 - 退出游戏
document.getElementById('signout').addEventListener('click', () => {
  alert(CONFIG.lang.CLOSE_MSG);
});

// 屏幕点击事件
document.getElementById('canvas-view').addEventListener('click', (event) => {
  if (isGameStart && !isGameOver) {
    const point = getPieceLocation(
      event.layerX,
      event.layerY,
      canvasWidth,
      canvasHeight,
      canvasGap
    );
    // 边界条件
    if (
      (point.a >= 0 && point.b >= 0) &&
      (point.a < 15 && point.b < 15) &&
      notInChessboard(pieceList, point)
    ) {
      setPlayer();
      handPiece.$view.$model.x = event.layerX;
      handPiece.$view.$model.y = event.layerY;
      handPiece.$view.$model.type = player === CONFIG.BLACK ? CONFIG.WHITE : CONFIG.BLACK;

      let piece = new PieceContraller(new PieceView(new PieceModel({
        type: player === CONFIG.BLACK ? CONFIG.BLACK : CONFIG.WHITE,
        // canvas位置
        x: point.x,
        y: point.y,
        // 棋盘位置
        a: point.a,
        b: point.b,
        radius: 15,
        lineColor: CONFIG.BLACK_COLOR
      })));
      // console.log(piece);
      if (pieceList) {
        pieceList.push(piece);
      }
      // 判断胜负
      if (judgeSuccess(pieceList)) {
        setTimeout(() => {
          alert(`【${player === CONFIG.BLACK ? CONFIG.lang.BLACK : CONFIG.lang.WHITE}】${CONFIG.lang.WIN}！！`);
        }, 100);
        isGameOver = true;
      }
    }

    // piece.$view.draw(ctx);
  } else if (!isGameStart){
    alert(CONFIG.lang.PLEASE_START_GAME);
  }

});
