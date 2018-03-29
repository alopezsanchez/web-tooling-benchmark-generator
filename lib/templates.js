const ejs = require("ejs");
const path = require("path");

const generatorRootPath = path.join(__dirname, "../");

const renderLicense = async () => {
  return await renderFile(
    `${generatorRootPath}/templates/license.ejs`,
    { year: new Date().getFullYear() },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return result;
    }
  );
};

const renderBenchmark = async library => {
  const license = await renderLicense();
  return await renderFile(
    `${generatorRootPath}/templates/benchmark.ejs`,
    { library },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return license + result;
    }
  );
};

const renderBenchmarkTest = async library => {
  const license = await renderLicense();
  return await renderFile(
    `${generatorRootPath}/templates/benchmark-test.ejs`,
    { library },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return license + result;
    }
  );
};

const renderDocsSection = async library => {
  return await renderFile(
    `${generatorRootPath}/templates/docs-section.ejs`,
    { library },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return result;
    }
  );
};

const renderTargetListItem = async (library, hasNext) => {
  return await renderFile(
    `${generatorRootPath}/templates/target-list-item.ejs`,
    { library, hasNext },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return result;
    }
  );
};

const renderFile = async (file, data, cb) =>
  await ejs.renderFile(file, data, cb);

module.exports = {
  renderBenchmark,
  renderBenchmarkTest,
  renderDocsSection,
  renderTargetListItem
};
