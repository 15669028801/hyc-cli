#!/usr/bin/env node
// 这里要注意开头的 #!/usr/bin/env node 这个语句必须加上!!!!!!!
// 主要是为了让系统看到这一行的时候，会沿着该路径去查找 node 并执行，主要是为了兼容 Mac ，确保可执行。

const program = require('commander')

// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all the templates')
  .command('init', 'generate a new project from a template')
  
// 解析命令行参数
program.parse(process.argv)