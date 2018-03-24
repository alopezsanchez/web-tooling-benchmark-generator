const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");

const inquirer = require("./lib/inquirer");
const npm = require("./lib/npm");

clear();
console.info(
  chalk.yellow(
    figlet.textSync("Web tooling benchmark")
  )
);

const run = async () => {
  const answers = await inquirer.ask();

  npm.install(answers.library);
};

run();
