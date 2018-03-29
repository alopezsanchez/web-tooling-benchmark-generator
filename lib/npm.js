const spawn = require("cross-spawn");

const logger = require("./logger");

module.exports = {
  install: async package => {
    const npmInstall = await spawn("npm", ["idfg", "--save-exact", package], {
      stdio: "inherit"
    });

    if (npmInstall.error) {
      logger.error("There was an error during `npm install`.");
    }
  }
};
