#!/usr/bin/env node

const { EOL } = require("os");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");

const config = require("./config");

const cli = require("./lib/cli");
const logger = require("./lib/logger");
const npm = require("./lib/npm");
const sourceFiles = require("./lib/source-files");
const checks = require("./lib/checks");
const docs = require("./lib/docs");
const targetList = require("./lib/target-list");

// Clear terminal
clear();
console.info(chalk.yellow(figlet.textSync("Web tooling benchmark")));

const run = async () => {
  if (!checks.isWebToolingBenchmark()) {
    logger.error("It seems that you are not in the correct repository.");
    logger.error(`Please, go to your ${config.repositoryName} clone.${EOL}`);
    process.exit(1);
  }

  const { library } = await cli.ask();

  if (checks.isAlreadyABenchmark(library)) {
    logger.error(
      "It seems that there is already a benchmark for this library."
    );
    process.exit(1);
  }

  await npm.install(library);

  await sourceFiles.createBenchmarkFile(library);
  await sourceFiles.createBenchmarkTestFile(library);

  await docs.createNewSection(library);

  await targetList.addLibrary(library);
};

run();
