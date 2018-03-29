const spawn = require("cross-spawn");

const { INFO, ERROR } = require("./cli/status");

module.exports = {
  install: (package, cli) => {
    cli.write("Installing dependency...", INFO);

    const npmProcess = spawn.sync("npm", ["i", "--save-exact", package], {
      stdio: "inherit"
    });

    // Kill the process if there was an error.
    if (npmProcess.status > 0) {
      cli.write("It seems that there was an error during npm install.", ERROR);
      process.exit(1);
    }
  }
};
