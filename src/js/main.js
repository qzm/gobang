import { ObjectPool } from './util.js';
console.info('游戏开始了！');
const pool = ObjectPool();
pool.init(10);
