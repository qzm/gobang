import { run } from './Util';
import { Contraller, PieceContraller } from './Contrallers';
import { View, PieceView } from './Views';
import { Model, PieceModel } from './Models';
// hello
const hello = new Contraller(new View(new Model({ name: 'Welcome to this game!' })));
console.info(hello.getName());

//  动画循环
function animation() {
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
