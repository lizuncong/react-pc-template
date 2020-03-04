const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

// meta.js文件举例
module.exports = {
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '项目名称',
    },
    description: {
      type: 'string',
      required: false,
      message: '项目简介 ',
      default: '就是一个项目',
    },
    author: {
      type: 'string',
      message: '作者',
    },
    router: {
      type: 'confirm',
      message: '是否安装路由',
    },
    lint: {
      type: 'confirm',
      message: '是否使用ESLint',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: '选择一个 ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: '不了，自己配置',
          value: 'none',
          short: 'none',
        },
      ],
    },
    autoInstall: {
      type: 'list',
      message:
        '是否自动安装依赖',
      choices: [
        {
          name: '是的, 使用 NPM',
          value: 'npm',
        },
        {
          name: '是的, 使用 Yarn',
          value: 'yarn',
        },
        {
          name: '手动安装',
          value: false,
        },
      ],
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'src/router/**/*': 'router && lintConfig === airbnb',
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
