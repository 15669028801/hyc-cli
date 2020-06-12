#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require("chalk");
const fs = require("fs");
const tplObj = require(`${__dirname}/../template.json`);

/**
 * 交互问题
 */
const question = [
  {
    name: "name",
    type: "input",
    message: "请输入需要删除的模板名称",
    validate(val) {
      if (val === '') {
        return '请输入模板名称'
      } else if (!tplObj[val]) {
        return `该模板'${val}'不存在`
      } else {
        return true;
      }
    }
  }
]

inquirer.prompt(question).then(awswers => {
  const { name, url } = awswers;
  // 删除对于模板
  delete tplObj[name]
  // 将对于的模板信息写入
  fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', (err) => {
    if (err) console.error("写入失败：", err);

    console.log('\n')
    console.log(chalk.green('删除模板成功!\n'))
    console.log(chalk.grey('当前最新模板: \n'))
    console.log(tplObj)
    console.log('\n')
  })
})