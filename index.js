#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");

const files = require("./lib/files");
const inquirer = require("./lib/inquirer");

clear();
console.log(
  chalk.yellow(
    figlet.textSync("Web tooling benchmark")
  )
);

const run = async () => {
  const answers = await inquirer.ask();
  console.log(answers);
};

run();