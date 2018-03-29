const chalk = require("chalk");

const info = message => console.info(chalk.cyan(message));
const success = message => console.info(chalk.green(message));
const error = message => console.error(chalk.red(message));
const warn = message => console.warn(chalk.orange(message));

module.exports = {
  info,
  success,
  error,
  warn
};
