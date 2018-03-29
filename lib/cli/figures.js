const chalk = require("chalk");
const figlet = require("figlet");
const { tick, cross, info: infoRaw, warning } = require("figures");

module.exports = {
  success: chalk.green(tick),
  error: chalk.red(cross),
  warn: chalk.yellow(warning),
  info: chalk.cyan(infoRaw),
  banner: chalk.yellow(figlet.textSync("Web tooling benchmark"))
};
