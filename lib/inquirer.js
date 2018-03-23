const inquirer = require("inquirer");
const files = require("./files");

const ask = () => {
  const questions = [
    {
      name: "library",
      type: "input",
      message: "Enter the library name to create the benchmark:",
      validate: value => {
        return value.length ? true : "Please, enter the library name"
      }
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = {
  ask
};