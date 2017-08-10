import { run } from './Util';
import { PieceContraller } from './Contrallers';
import { PieceView } from './Views';
import { PieceModel } from './Models';

let piece = pool.create();
piece = new PieceContraller(new PieceView(new PieceModel({ name: 'Piece' })));

//  动画循环
run(() => {
  console.log(piece);
})
