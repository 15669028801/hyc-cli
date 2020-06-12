// commander.js  生成对应的命令（例如 node，yarn对象等）
// inquirer.js 交互式插件，用于终端交互使用
// chalk.js 控制命令行颜色
// ora.js 下载loading图标

const { program } = require('commander');
var inquirer = require('inquirer');
var questions = [
  {
    type: 'confirm',
    name: 'bacon',
    message: '国庆节回合川么'
  },
  {
    type: 'input',
    name: 'favorite',
    message: '为什么不回合川?',
    when: function(answers) {
      return !answers.bacon;
    }
  },
  {
    type: 'checkbox',
    message: 'Select toppings',
    name: 'toppings',
    choices: [
      new inquirer.Separator(' = The Meats = '),
      {
        name: 'Pepperoni'
      },
      {
        name: 'Ham'
      },
      {
        name: 'Ground Meat'
      },
      {
        name: 'Bacon'
      },
      new inquirer.Separator(' = The Cheeses = '),
      {
        name: 'Mozzarella',
        checked: true
      },
      {
        name: 'Cheddar'
      },
      {
        name: 'Parmesan'
      },
      new inquirer.Separator(' = The usual ='),
      {
        name: 'Mushroom'
      },
      {
        name: 'Tomato'
      },
      new inquirer.Separator(' = The extras = '),
      {
        name: 'Pineapple'
      },
      {
        name: 'Olives',
        disabled: 'out of stock'
      },
      {
        name: 'Extra cheese'
      }
    ],
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topping.';
      }

      return true;
    }
  }
];

function likesFood(aFood) {
  return function(answers) {
    return answers[aFood];
  };
}

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});