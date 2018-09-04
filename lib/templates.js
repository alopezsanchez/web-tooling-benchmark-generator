const ejs = require("ejs");
const path = require("path");

// TODO: Use CLI stream to log ejs errors.
const logger = require("./logger");
const {
  adaptLibraryNameToDependencyName,
  adaptLibraryNameToFileName
} = require("./helpers");

const generatorRootPath = path.join(__dirname, "../");

const renderLicense = () => {
  return renderFile(`${generatorRootPath}/templates/license.ejs`, {
    year: new Date().getFullYear()
  });
};

const renderBenchmark = async library => {
  const license = await renderLicense();
  const content = await renderFile(
    `${generatorRootPath}/templates/benchmark.ejs`,
    {
      library,
      dependencyName: adaptLibraryNameToDependencyName(library),
      fileName: adaptLibraryNameToFileName(library)
    }
  );
  return license + content;
};

const renderBenchmarkTest = async library => {
  const license = await renderLicense();
  const content = await renderFile(
    `${generatorRootPath}/templates/benchmark-test.ejs`,
    {
      library,
      dependencyName: adaptLibraryNameToDependencyName(library),
      fileName: adaptLibraryNameToFileName(library)
    }
  );
  return license + content;
};

const renderDocsSection = async library =>
  await renderFile(`${generatorRootPath}/templates/docs-section.ejs`, {
    library
  });

const renderTargetListItem = async (library, hasNext) => {
  return await renderFile(
    `${generatorRootPath}/templates/target-list-item.ejs`,
    { library, hasNext }
  );
};

const renderFile = (file, data) => {
  return new Promise(resolve => {
    ejs.renderFile(file, data, (err, result) => {
      if (err) {
        logger.error(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  renderBenchmark,
  renderBenchmarkTest,
  renderDocsSection,
  renderTargetListItem
};
