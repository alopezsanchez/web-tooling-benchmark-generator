#!/usr/bin/env node

const { EOL } = require("os");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");

const config = require("./config");

const CLI = require("./lib/cli");
const { SUCCESS, ERROR } = require("./lib/cli/status");
const npm = require("./lib/npm");
const sourceFiles = require("./lib/source-files");
const checks = require("./lib/checks");
const docs = require("./lib/docs");
const targetList = require("./lib/target-list");

// Clear terminal
clear();
console.info(chalk.yellow(figlet.textSync("Web tooling benchmark")));

const run = async () => {
  const cli = new CLI();

  /* ************************************* */

  const checkRepoMessage = `Checking if you are in a ${
    config.repositoryName
  } benchmark repository...`;

  cli.startSpinner(checkRepoMessage);
  if (!checks.isWebToolingBenchmark()) {
    cli.persist(
      "It seems that you are not in the correct repository. " +
        `Please, go to your ${config.repositoryName} clone.${EOL}`,
      ERROR
    );
    process.exit(1);
  }
  cli.persist(checkRepoMessage, SUCCESS);

  /* ************************************* */

  const { library } = await cli.ask();

  /* ************************************* */

  const checkBenchmarkMessage =
    "Checking if a benchmark for this library doesn't exist...";

  cli.startSpinner(checkBenchmarkMessage);
  if (checks.isAlreadyABenchmark(library)) {
    cli.persist(
      "It seems that there is already a benchmark for this library.",
      ERROR
    );
    process.exit(1);
  }
  cli.persist(checkBenchmarkMessage, SUCCESS);

  /* ************************************* */

  npm.install(library, cli);

  /* ************************************* */

  await sourceFiles.createBenchmarkFile(library, cli);

  /* ************************************* */

  await sourceFiles.createBenchmarkTestFile(library, cli);

  /* ************************************* */

  await docs.createNewSection(library);

  /* ************************************* */

  await targetList.addLibrary(library);
};

run();
