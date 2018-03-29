const fs = require("fs");
const path = require("path");

const logger = require("./logger");
const config = require("../config");

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const fileExists = file => fs.existsSync(file);

const directoryExists = filePath => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
};

// TODO: refactor next function
const writeFile = (file, content, folder = config.sourcePath) => {
  if (directoryExists(folder)) {
    fs.writeFileSync(file, content, "utf8");
  } else {
    logger.error(`ERROR: ${folder} folder doesn't exist.`);
  }
};

module.exports = {
  getCurrentDirectoryBase,
  fileExists,
  directoryExists,
  writeFile
};
