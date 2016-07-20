'use strict';

const FS = require('fs');
const PATH = require('path');
const FILE_STATE = require('../parsers/file.state.enum');

function pathNotSupported(path) {
  const NAME = PATH.basename(path);
  const IGNORED_FOLDERS = [
    'node_modules',
    '.git',
    'build',
    'builds',
    'dist',
    'release',
    'releases'
  ];
  return IGNORED_FOLDERS.indexOf(NAME) !== -1 ||
    NAME.startsWith('.') ||
    NAME.indexOf('.map') !== -1;
}

// Properties common to both folders and files
function itemFactory(path) {
  const name = PATH.basename(path);
  return {
    path,
    name,
    parsed: FILE_STATE.NOT_PARSED,
    opened: true // TODO: change it back to false when done
  };
}

function fileExtensionIsInvalid(acceptedFileExtensions, fileExtension) {
  return acceptedFileExtensions &&
    acceptedFileExtensions.length &&
    acceptedFileExtensions.indexOf(fileExtension) === -1;
}

/**
 * usage:
 *    var dirTree = require('./directory-tree');
 *    var tree = dirTree('/some/path');
 *    var filteredTree = dirTree('/some/path', ['.jpg', '.png']);
 *
 * @param {String} path
 * @param {Array} acceptedFileExtensions
 * @returns {Object} JSON object representing contents of a given path
 */
module.exports = function directoryTree(path, acceptedFileExtensions) {
  if (pathNotSupported(path)) return null;
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
