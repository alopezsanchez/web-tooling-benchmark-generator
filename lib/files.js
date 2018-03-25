const fs = require("fs");
const path = require("path");

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

const writeFile = (file, content) => {
  if (directoryExists(config.sourcePath)) {
    fs.writeFileSync(file, content, "utf8");
  } else {
    console.error(`ERROR: ${config.sourcePath} folder doesn't exist`);
  }
};

module.exports = {
  getCurrentDirectoryBase,
  fileExists,
  directoryExists,
  writeFile
};
