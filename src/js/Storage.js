// 数据存储，用于悔棋

class Storage {
  constructor() {
    this.database = [];
  }
  // 存储当前的State
  push(state) {
    // 存贮state
    this.database.push({
      ...state,
      $time: new Date()
    });
    return state;
  }
  // 恢复状态
  pop() {
    return this.database.pop();
  }
}
