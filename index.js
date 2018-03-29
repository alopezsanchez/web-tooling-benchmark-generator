#!/usr/bin/env node

const { EOL } = require("os");

const config = require("./config");
const CLI = require("./lib/cli");
const { SUCCESS, ERROR } = require("./lib/cli/status");
const npm = require("./lib/npm");
const sourceFiles = require("./lib/source-files");
const checks = require("./lib/checks");
const docs = require("./lib/docs");
const targetList = require("./lib/target-list");

const cli = new CLI();

// Clear terminal and display the banner.
cli.clear();
cli.displayBanner();

const run = async () => {
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

  const { library } = await cli.ask();

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

  // Install dependency.
  npm.install(library, cli);

  // Create source files.
  await sourceFiles.createBenchmarkFile(library, cli);
  await sourceFiles.createBenchmarkTestFile(library, cli);

  // Update docs.
  await docs.createNewSection(library, cli);

  // Update target list.
  await targetList.addLibrary(library, cli);
};

run();
