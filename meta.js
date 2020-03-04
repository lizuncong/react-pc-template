const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
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
    router: {
      type: 'confirm',
      message: '是否安装路由',
    },
    autoInstall: {
      type: 'list',
      message:
        '项目生成后是否自动安装依赖？',
      choices: [
        {
          name: '是, 使用 NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: '是, 使用 Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: '否',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    'router.js': 'router'
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
