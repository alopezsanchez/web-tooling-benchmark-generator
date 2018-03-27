#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const { EOL } = require("os");

const config = require("./config");

const inquirer = require("./lib/inquirer");
// const npm = require("./lib/npm");
const sourceFiles = require("./lib/source-files");
const checks = require("./lib/checks");

clear();
console.info(chalk.yellow(figlet.textSync("Web tooling benchmark")));

const run = async () => {
  if (!checks.isWebToolingBenchmark()) {
    console.error("It seems that you are not in the correct repository.");
    console.error(`Please, go to your ${config.repositoryName} clone${EOL}`);
    process.exit(0);
  }

  const { library } = await inquirer.ask();

  if (checks.isAlreadyABenchmark(library)) {
    console.error(
      "It seems that there is already a benchmark for this library"
    );
    process.exit(0);
  }

  // npm.install(answers.library);

  await sourceFiles.createBenchmarkFile(library);
  await sourceFiles.createBenchmarkTestFile(library);
};

run();
