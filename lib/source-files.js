const path = require("path");

const files = require("./files");
const templates = require("./templates");
const config = require("../config");
const { SUCCESS, ERROR } = require("./cli/status");

const createBenchmarkFile = async (library, cli) => {
  const filename = path.join(
    config.sourcePath,
    `${library}${config.benchmarkExtension}`
  );
  const createBenchmarkFileMessage = `Creating ${filename}...`;
  cli.startSpinner(createBenchmarkFileMessage);

  // Get the rendered content
  const content = await templates.renderBenchmark(library);

  const created = files.writeFile(filename, content);

  cli.persist(createBenchmarkFileMessage, created ? SUCCESS : ERROR);
};

const createBenchmarkTestFile = async (library, cli) => {
  const filename = path.join(
    config.sourcePath,
    `${library}${config.benchmarkTestExtension}`
  );
  const createBenchmarkTestFileMessage = `Creating ${filename}...`;
  cli.startSpinner(createBenchmarkTestFileMessage);

  // Get the rendered content
  const content = await templates.renderBenchmarkTest(library);

  const created = files.writeFile(filename, content);

  cli.persist(createBenchmarkTestFileMessage, created ? SUCCESS : ERROR);
};

module.exports = {
  createBenchmarkFile,
  createBenchmarkTestFile
};
