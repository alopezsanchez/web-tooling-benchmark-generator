const path = require("path");

const files = require("./files");
const config = require("../config");

// web tooling benchmark files
let packageJson = null;
const packageJsonPath = path.join(process.cwd(), "package.json");

if (files.fileExists(packageJsonPath)) {
  packageJson = require(packageJsonPath);
}

let targetList = null;
const targetListPath = path.join(
  process.cwd(),
  config.sourcePath,
  config.targetListFilename
);

if (files.fileExists(targetListPath)) {
  targetList = require(targetListPath).targetList;
}

// Check if the current project is `v8/web-tooling-benchmark`
const checkPackageJson = () => {
  return (
    packageJson &&
    packageJson.name === config.repositoryName &&
    packageJson.repository === config.repositoryUrl
  );
};

// Check if `src` is a directory
const existsSrc = () =>
  files.directoryExists(path.join(process.cwd(), config.sourcePath));

const isWebToolingBenchmark = () => {
  return checkPackageJson() && existsSrc();
};

const isAlreadyABenchmark = library => {
  // First, check if it is already a dependency
  if (packageJson && packageJson.dependencies[library]) {
    return true;
  }

  // Check the target list
  if (targetList && targetList.has(library)) {
    return true;
  }

  // Check if the benchmark and the benchmark test files exist
  const srcPath = path.join(process.cwd(), config.sourcePath);
  if (
    files.fileExists(
      path.join(srcPath, `${library}${config.benchmarkExtension}`)
    ) ||
    files.fileExists(
      path.join(srcPath, `${library}${config.benchmarkTestExtension}`)
    )
  ) {
    return true;
  }

  // TODO: More checks
  return false;
};

module.exports = {
  isWebToolingBenchmark,
  isAlreadyABenchmark
};
