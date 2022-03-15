module.exports = () => {
  let isFirstCompile = true;
  const repeatLog = () => {
    if (isFirstCompile) {
      setTimeout(() => {
        process.stdout.write("---首次编译结束---\n");
        setTimeout(() => {
          process.stdout.write("---首次编译结束---\n");
          isFirstCompile = false;
        }, 500);
      }, 100);
      process.stdout.write("---首次编译结束---\n");
    } else {
      setTimeout(() => {
        process.stdout.write("---编译结束---\n");
        setTimeout(() => {
          process.stdout.write("---编译结束---\n");
        }, 100);
      }, 500);
      process.stdout.write("---编译结束---\n");
    }
  };
  class ConsolePlugin {
    constructor() {}
    apply(compiler) {
      compiler.hooks.beforeCompile.tapAsync("start", (params, callback) => {
        if (isFirstCompile) {
          process.stdout.write("---开始首次编译---\n");
        } else {
          process.stdout.write("---开始编译---\n");
        }
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
  return ConsolePlugin
};
