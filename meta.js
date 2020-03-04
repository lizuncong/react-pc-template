const path = require('path')

const {
  installDependencies,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    if_eq(a, b, opts) {
      return a === b
        ? opts.fn(this)
        : opts.inverse(this)
    },
    unless_eq(a, b, opts) {
      return a === b
        ? opts.inverse(this)
        : opts.fn(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    name: {
      type: 'input',
      required: true,
      message: '项目名称',
    },
    description: {
      type: 'input',
      required: false,
      message: '项目简介',
    },
    author: {
      type: 'input',
      message: '项目作者',
    },
    cssProcessor: {
      type: 'list',
      message: '选择一门CSS扩展语言',
      choices: [
        {
          name: 'Less',
          value: 'less',
        },
        {
          name: 'Sass(Scss)',
          value: 'sass',
        },
        {
          name: '不了，自己配置',
          value: 'none',
        },
      ],
    },
    autoInstall: {
      type: 'list',
      message:
        '项目生成后是否自动安装依赖？',
      choices: [
        {
          name: '是, 使用 NPM',
          value: 'npm',
        },
        {
          name: '是, 使用 Yarn',
          value: 'yarn',
        },
        {
          name: '否',
          value: false,
        },
      ],
    },
  },
  filters: {},
  complete: function(data, chalk) {
    const green = chalk.green

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          printMessage(data, chalk)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
