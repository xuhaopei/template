// 自定义构建日志
const {entries, devServerProxy} = require('../../entrys/index')
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let localIP;

  Object.keys(interfaces).forEach((iface) => {
    interfaces[iface].forEach((ifaceInfo) => {
      if (ifaceInfo.family === 'IPv4' && !ifaceInfo.internal) {
        localIP = ifaceInfo.address;
      }
    });
  });

  return localIP;
}

module.exports = class {
    apply(compiler) {
      compiler.hooks.done.tap('CustomBuildLogPlugin', (stats) => {
        // 清空构建日志
        console.clear()
  
        if (stats.hasErrors()) {
          console.error('Build failed with errors.\n')
          console.error(stats.toString({ colors: true }))
        } else {
          // 输出自定义信息
          console.log('当前页面路由：')
          console.log('')
          let keys = Object.keys(entries)
          for (const key of keys) {
            // pc不需要，因为这是brower页面
            if (key.indexOf('pc') >= 0)  {
              console.log(`http://${getLocalIP()}:9000?op=2`)
            } else {
              console.log(`http://${getLocalIP()}:9000/${key}`)
            }
            console.log('')
          }

          // 输出当前代理信息

          console.log('当前代理信息:')
          console.log(devServerProxy)
        }
      })
    }
  }
