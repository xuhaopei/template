module.exports = class {
  apply(compiler) {
    compiler.hooks.done.tap('CustomBuildLGteFinishTimeogPlugin', (stats) => {
      setTimeout(() => {
        // 构建完成时间
        const buildDuration = (stats.endTime - stats.startTime) / 1000;
        console.log(`构建完成所需时间：${buildDuration} s`)
        console.log('')
      }, 2000)
    })
  }
}
