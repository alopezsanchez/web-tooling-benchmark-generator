const ejs = require("ejs");

const renderLicense = async () => {
  return await renderFile(
    "templates/license.ejs",
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
    "templates/benchmark.ejs",
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
    "templates/benchmark-test.ejs",
    { library },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      return license + result;
    }
  );
};

const renderFile = async (file, data, cb) =>
  await ejs.renderFile(file, data, cb);

module.exports = {
  renderLicense,
  renderBenchmark,
  renderBenchmarkTest
};
