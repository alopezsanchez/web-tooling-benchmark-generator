const path = require("path");

const files = require("./files");
const templates = require("./templates");
const config = require("../config");

const createBenchmarkFile = async library => {
  // Get the rendered content
  const content = await templates.renderBenchmark(library);

  return files.writeFile(
    path.join(config.sourcePath, `${library}${config.benchmarkExtension}`),
    content
  );
};

const createBenchmarkTestFile = async library => {
  // Get the rendered content
  const content = await templates.renderBenchmarkTest(library);

  return files.writeFile(
    path.join(config.sourcePath, `${library}${config.benchmarkTestExtension}`),
    content
  );
};

module.exports = {
  createBenchmarkFile,
  createBenchmarkTestFile
};
