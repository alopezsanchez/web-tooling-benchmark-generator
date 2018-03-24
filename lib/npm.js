const spawn = require("cross-spawn");
const CLI = require("clui");

module.exports = {
  install: async package => {
    const spinner = new CLI.Spinner("Installing dependencies...");
    spinner.start();
    const npmInstall = await spawn("npm", ["idfg", "--save-exact", package], { stdio: "inherit"});

    if (npmInstall.error) {
      console.error("There was an error during `npm install`");
    }
    spinner.stop();
  }
};
