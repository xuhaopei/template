const fs = require('fs')
const path = require('path')

module.exports = class {
  apply(compiler) {
    compiler.hooks.done.tap('ChangeWorkerServiceName', (stats) => {
      // 查找dist文件夹里面的html文件与service-worker.js文件，
      // 0、获取当前时间戳后8位。
      // 1、遍历所有的html文件内容，如果内容有里面service-worker.js这段字符串，则将字符串替换成service-worker.js + 后8位时间戳，
      // 2、将dist目录下service-worker.js文件名称替换为 service-worker.js + 后8位时间戳。
      const distPath = path.resolve(compiler.options.output.path)
      const timestamp = Date.now().toString().slice(-8)

      // 递归遍历目录
      function traverseDirectory(dirPath) {
        fs.readdir(dirPath, (err, files) => {
          if (err) {
            console.error('Error reading directory:', err)
            return
          }

          files.forEach(file => {
            const filePath = path.join(dirPath, file)

            fs.stat(filePath, (err, stats) => {
              if (err) {
                console.error('Error getting file stats:', err)
                return
              }

              if (stats.isDirectory()) {
                // 递归处理子目录
                traverseDirectory(filePath)
              } else if (path.extname(file) === '.html') {
                // 处理 HTML 文件
                fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    console.error(`Error reading file ${filePath}:`, err)
                    return
                  }
                  if(data.indexOf('service-worker\.js') < 0) {
                    return
                  }

                  // 替换 service-worker.js
                  const updatedData = data.replace(/service-worker\.js/g, `service-worker${timestamp}.js`)

                  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                    if (err) {
                      console.error(`Error writing file ${filePath}:`, err)
                    } else {
                      console.log(`Updated ${filePath}`)
                    }
                  })
                })
              }
            })
          })
        })
      }

      // 重命名 service-worker.js 文件
      function renameServiceWorkerFile(dirPath) {
        const swFilePath = path.join(dirPath, 'service-worker.js')
        const newSwFilePath = path.join(dirPath, `service-worker${timestamp}.js`)

        fs.rename(swFilePath, newSwFilePath, (err) => {
          if (err) {
            console.error(`Error renaming service-worker.js to ${newSwFilePath}:`, err)
          } else {
            console.log(`Renamed service-worker.js to ${newSwFilePath}`)
          }
        })
      }


      // 重命名 service-worker.js 文件
      renameServiceWorkerFile(distPath);

      // 开始遍历 dist 目录
      traverseDirectory(distPath);


    })
  }
}
