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
