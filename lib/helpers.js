const sortedIndex = require("lodash.sortedindex");

const splitAt = index => x => [x.slice(0, index), x.slice(index)];

// Get the next library sorted alph.
const findPreviosLibraryAlph = (list, library) => {
  // list is a Set
  const arrayList = [...list];
  const index = sortedIndex([...list], library);

  // If there is no next, return the last one
  if (index === arrayList.length) {
    return arrayList[index - 1];
  }
  return [...list][index];
};

// @scope/package -> scope-package
const adaptLibraryNameToFileName = libraryName =>
  libraryName.replace(/\//g, "-").replace(/@/g, "");

// @scope/package -> scopepackage
const adaptLibraryNameToDependencyName = libraryName =>
  libraryName.replace(/\//g, "").replace(/@/g, "");

module.exports = {
  splitAt,
  findPreviosLibraryAlph,
  adaptLibraryNameToFileName,
  adaptLibraryNameToDependencyName
};
