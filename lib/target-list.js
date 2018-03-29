const path = require("path");
const fs = require("fs");

const files = require("./files");
const templates = require("./templates");
const config = require("../config");
const { splitAt, findPreviosLibraryAlph } = require("./helpers");
const { SUCCESS, ERROR } = require("./cli/status");

const cliFlagsHelperPath = path.join(
  process.cwd(),
  config.sourcePath,
  `${config.targetListFilename}.js`
);

const addLibrary = async (library, cli) => {
  const addLibraryMessage = `Updating target list in ${cliFlagsHelperPath}`;
  cli.startSpinner(addLibraryMessage);

  // targetList. Used to know all the libraries under benchmark
  const { targetList } = require(path.join(
    process.cwd(),
    config.sourcePath,
    config.targetListFilename
  ));

  const nextLibrary = findPreviosLibraryAlph(targetList, library);
  const hasNext = [...targetList][targetList.size - 1] !== nextLibrary;

  // Stringified docs content.
  // TODO: move fs.readFileSync to files module.
  const cliFlagsHelperContent = fs.readFileSync(cliFlagsHelperPath, "utf8");

  // Split the content file by the next array element,
  // or the end of the array if there is no next.
  const indexToSplit = hasNext
    ? cliFlagsHelperContent.indexOf(`"${nextLibrary}"`)
    : cliFlagsHelperContent.indexOf(`"${nextLibrary}"`) +
      `"${nextLibrary}"`.length;
  const splitted = splitAt(indexToSplit)(cliFlagsHelperContent);

  // Render the template.
  const newItem = await templates.renderTargetListItem(library, hasNext);

  // TODO: insert a tab.
  const newFileContent = hasNext
    ? splitted[0] + newItem + "  " + splitted[1]
    : splitted[0] + newItem + splitted[1];

  const created = files.writeFile(cliFlagsHelperPath, newFileContent);

  cli.persist(addLibraryMessage, created ? SUCCESS : ERROR);
};

module.exports = {
  addLibrary
};
