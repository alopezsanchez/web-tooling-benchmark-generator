const ejs = require("ejs");

module.exports = {
  compileLicense: () => {
    return ejs.renderFile(
      "templates/license.ejs",
      { year: new Date().getFullYear() },
      (err, result) => {
        if (err) {
          console.error(err);
          return result;
        }
      }
    );
  }
};
