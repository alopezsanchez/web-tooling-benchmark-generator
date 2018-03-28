const path = require("path");
const fs = require("fs");
const sortedIndex = require("lodash.sortedindex");

const files = require("./files");
const templates = require("./templates");
const config = require("../config");

const docsPath = path.join(
  process.cwd(),
  config.docsFolder,
  config.docFilename
);
// Stringified docs content.
const docs = fs.readFileSync(docsPath, "utf8");

// targetList. Used to know all the libraries under benchmark
const { targetList } = require(path.join(
  process.cwd(),
  config.sourcePath,
  config.targetListFilename
));

// Util
const splitAt = index => x => [x.slice(0, index), x.slice(index)];

// Get the next library sorted alph.
const findPreviosSectionAlph = library =>
  [...targetList][sortedIndex([...targetList], library)];

const createNewSection = async library => {
  const nextSection = findPreviosSectionAlph(library);

  // Split the content file at the next section header.
  const splitted = splitAt(docs.indexOf(`## ${nextSection}`))(docs);

  // Render the section content.
  const newSectionContent = await templates.renderDocsSection(library);

  // Build the new file content
  const newFileContent = splitted[0] + newSectionContent + splitted[1];

  // Write file
  files.writeFile(docsPath, newFileContent, config.docsFolder);
};

module.exports = {
  createNewSection
};
