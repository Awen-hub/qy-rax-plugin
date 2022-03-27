module.exports = () => {
  let isFirstCompile = true;
  const repeatLog = () => {
    if (isFirstCompile) {
      setTimeout(() => {
        process.stdout.write("首次编译结束");
        setTimeout(() => {
          process.stdout.write("首次编译结束");
          isFirstCompile = false;
        }, 500);
      }, 100);
      process.stdout.write("首次编译结束");
    }
  };
  class ConsolePlugin {
    constructor() {}
    apply(compiler) {
      compiler.hooks.beforeCompile.tapAsync("start", (params, callback) => {
        process.stdout.write("开始编译");
        callback();
      });
      compiler.hooks.done.tapAsync("done", (params, callback) => {
        repeatLog();
        callback();
      });
      compiler.hooks.emit.tapAsync("done", (params, callback) => {
        repeatLog();
        callback();
      });
      compiler.hooks.afterEmit.tapAsync("done", (params, callback) => {
        repeatLog();
        callback();
      });
    }
  }
  return ConsolePlugin;
};
