const spawn = require('child_process').spawn

exports.installDependencies = (cwd, executable = 'npm', color) => {
  console.log(`\n\n# ${color('正在安装项目依赖 ...')}`)
  console.log('# ========================\n')
  return new Promise((resolve) => {
    const spwan = spawn(
      executable,
      ['install'],
      {
        cwd,
        stdio: 'inherit',
        shell: true,
      }
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}


exports.printMessage = function printMessage(data, { green, yellow }) {
  console.log(green('项目初始化完成!'))
  console.log(green('========================='))
  if(!data.inPlace){
    console.log(yellow(`cd ${data.destDirName}`))
  }
  if(!data.autoInstall){
    console.log(yellow('npm install'))
  }
  console.log(yellow('npm run start'))
}





