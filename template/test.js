/*测试文件，需要删除*/

{{#lint}}
  const createFunc = () => ({
      console.log('hahah')
  })
{{/lint}}

{{#if_eq build "standalone"}}  // 如果变量build === 'standalone'，则执行里面的语句
  const a =  1;
{{/if_eq}}


{{#if_or unit e2e}} // 如果变量unit或者变量e2e有值，则执行里面的语句
  const b = 2;
{{/if_or}}
