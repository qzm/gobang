import { ObjectPool } from './util.js';
window.onload = function() {
  console.info('游戏开始了！');
  const pool = ObjectPool();
  pool.init(10);
}