const { EOL } = require("os");
const inquirer = require("inquirer");
const ora = require("ora");

const { success, error, warn, info } = require("./figures");
const { SUCCESS, ERROR, WARN, INFO } = require("./status");

const logStream = process.stdout.isTTY ? process.stdout : process.stderr;

class CLI {
  constructor() {
    this.stream = logStream;
    this.spinner = ora({ stream: this.stream });
  }

  getFigure(status) {
    switch (status) {
      case SUCCESS:
        return success;
      case ERROR:
        return error;
      case WARN:
        return warn;
      case INFO:
      default:
        return info;
    }
  }

  write(text, status = SUCCESS) {
    const figure = this.getFigure(status);
    this.stream.write(figure + "  " + text + EOL);
  }

  startSpinner(text) {
    this.spinner.text = text;
    this.spinner.start();
  }

  persist(text, status = SUCCESS) {
    const figure = this.getFigure(status);
    this.spinner.stopAndPersist({
      symbol: figure,
      text: " " + text
    });
  }

  ask() {
    const questions = [
      {
        name: "library",
        type: "input",
        message: "Enter the library name to create the benchmark:",
        validate: value => {
          return value.length ? true : "Please, enter the library name";
        }
      }
    ];
    return inquirer.prompt(questions);
  }
}

module.exports = CLI;
