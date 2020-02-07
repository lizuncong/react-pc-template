以下内容均翻译自eslint官网(https://eslint.org/docs/user-guide/configuring)
总的来说，eslint就是一个代码规则校验的工具，根据我们配置的ECMAScript版本，环境进行语法规则校验
1.Eslint能够配置以下信息：
    1.1环境(Environments)：脚本运行的环境，每个环境都有特定的全局变量集合
    1.2全局变量(Globals)：运行时读取的额外的全局变量
    1.3规则(Rules)：可用的规则及错误级别
2.配置Parser Options(语法分析选项)
   Eslint允许我们配置希望支持的JavaScript语言选项。Eslint默认要求的是ECMAScript 5语法。
   可以通过配置parser options支持其他的ECMAScript版本以及JSX
   注意：
      支持JSX语法与支持React不是一回事。如果需要使用React，推荐使用eslint-plugin-react
      支持ES6语法与支持新的ES6全局变量(例如Set类型)不是一回事。对于ES6语法，使用
      { "parserOptions": { "ecmaVersion": 6 } }。对于新的ES6全局变量，使用
      { "env": { "es6": true } }。如果配置了{ "env": { "es6": true } }会自动支持
      ES6语法，因此可以不用再配置{ "parserOptions": { "ecmaVersion": 6 } }。
      如果只是配置了{ "parserOptions": { "ecmaVersion": 6 } }，则不会自动支持新的
      ES6全局变量
   parser options可以配置的选项：
   2.1ecmaVersion: ECMAScript版本，可以设置成项目中需要的ECMAScript语法版本。
   2.2sourceType：默认为"script"，如果项目中使用的是ES module，则可以设置成"module"
   2.3ecmaFeatures
3.配置语法解析器(Parser)
   ESLint默认使用Espree作为它的语法分析程序。当然也可以使用其他第三方的解析器。使用第三方的解析器
   时需要使用npm安装对应的依赖。下面的语法解析器都能兼容ESLint:
   3.1Esprima
   3.2Babel-ESLint：如果在项目中使用到types (Flow)或者ESLint不支持的实验性语法，则使用
                    Babel-ESLint，其他情况使用默认的解析器
   3.3@typescript-eslint/parser
   注意：当使用第三方解析器时，同样需要配置parserOptions，parserOptions会作为参数
   传给指定的解析器。
4.配置处理器(Processor)
   Plugins可能提供processors。Processors能够从其他类型的文件中提取JavaScript代码，并
   交给ESLint处理。
5.配置环境(Environments)
   一个环境定义了一些预定义的全局变量，这里配置{
    env: {
      browser: true,
      es6: true,  
    }
   }就可以了。
6.配置全局变量(Globals)
   可以配置全局变量，包括自定义的以及其他的环境变量
7.配置插件(Plugins)
   ESLint支持使用第三方插件。
   plugins定义了rules，environment或者configs。
   因此我们可以利用plugin提供的规则，环境变量及配置。
   extends可以扩展plugin里面的rules。
