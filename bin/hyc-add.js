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
    message: "请输入模板名称",
    validate(val) {
      if (val === '') {
        return '模板名称必填！'
      } else if (tplObj[val]) {
        return '模板名称已存在，请重新输入'
      } else {
        return true;
      }
    }
  },
  {
    name: "url",
    type: "input",
    message: "请输入模板地址",
    validate(val) {
      return val === '' ? '请输入模板地址' : true
    }
  }
]

inquirer.prompt(question).then(awswers => {
  const { name, url } = awswers;
  // 过滤 unicode 字符
  tplObj[name] = url.replace(/[\u0000-\u0019]/g, '');

  // 将对于的模板信息写入
  fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', (err) => {
    if (err) console.error("写入失败：", err);

    console.log('\n')
    console.log(chalk.green('添加模板成功!\n'))
    console.log(chalk.grey('当前最新模板: \n'))
    console.log(tplObj)
    console.log('\n')
  })
})