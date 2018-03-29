const spawn = require("cross-spawn");

const { INFO } = require("./cli/status");

module.exports = {
  install: async (package, cli) => {
    const npmInstallMessage = "Installing dependency...";
    cli.write(npmInstallMessage, INFO);

    spawn("npm", ["i", "--save-exact", package], {
      stdio: "inherit"
    });
  }
};
