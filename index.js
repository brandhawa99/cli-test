#!/usr/bin/env node

import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string'
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
  const rainbowTile = chalkAnimation.rainbow(
    'Answer The following Questions? \n'
  )
  await sleep();
  rainbowTile.stop();
  console.log(`
    ${chalk.bgBlue("How To Play")}
    I am a process on your computer.
  `)
}



async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: "What is your name?",
    default() {
      return 'Player'
    }
  })
  playerName = answer.player_name;
  console.log(chalk.bgMagenta(playerName))
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: 'list',
    message: "How old am I? \n",
    choices: [
      "less than 18",
      "19 - 25",
      "25 - 32",
      "older than 33",
    ],
  })
  return handleAnswer(answers.question_1 == '19 - 25');

}
async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `nice work ${playerName}` })
  } else {
    spinner.error({ text: `You lose loser hahahaha  ${playerName}  is a loser!!!!` })
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `${playerName} is a winner`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
}


await welcome();
await askName();
await question1();
await winner();