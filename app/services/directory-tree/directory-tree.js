'use strict';

const FS = require('fs');
const PATH = require('path');
const FILE_STATE = require('../parsers/file.state.enum');

// Properties common to both folders and files
function itemFactory(path) {
  const name = PATH.basename(path);
  return {
    path,
    name,
    parsed: FILE_STATE.NOT_PARSED,
    opened: false,
  };
}

function fileExtensionIsInvalid(acceptedFileExtensions, fileExtension) {
  return acceptedFileExtensions &&
    acceptedFileExtensions.length &&
    acceptedFileExtensions.indexOf(fileExtension) === -1;
}

exports.directoryTree = function directoryTree(path, acceptedFileExtensions) => {
  const item = itemFactory(path);

  let stats;
  try { stats = FS.statSync(path); }
  catch (e) { return null; }

  if (stats.isFile()) {
    const fileExtension = PATH.extname(path).toLowerCase();
    if (fileExtensionIsInvalid(acceptedFileExtensions, fileExtension)) return null;

    // additional file information (size, last time modified, etc.)
    item.size = stats.size;
    item.lastModified = stats.mtime;
    item.extension = fileExtension;
  }
  else {
    item.children = FS
      .readdirSync(path)
      .map(child => directoryTree(PATH.join(path, child), acceptedFileExtensions))
      .filter(child => !!child);

    if (!item.children.length) return null;
  }
  return item;
};
