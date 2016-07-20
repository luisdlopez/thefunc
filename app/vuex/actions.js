'use strict';

import * as mutationsTypes from './mutation-types';
import directoryTree from '../services/directory-tree/directory-tree';
import scanner from '../services/scanner';

export const buildDirectoryTree = ({ dispatch }, path) => {
  const fileExtensions = ['.js'];
  const tree = directoryTree(path, fileExtensions);
  dispatch(mutationsTypes.BUILD_DIRECTORY_TREE, path, tree);
  // TODO: start project parsing action
  scanner.parseDirectoryTree(tree);
  // TODO: end project parsing action
};
export const toggleFolder = makeAction(mutationsTypes.TOGGLE_FOLDER);
export const startProjectParsing = makeAction(mutationsTypes.START_PROJECT_PARSING);
export const startFileParsing = makeAction(mutationsTypes.START_FILE_PARSING);
export const endFileParsing = makeAction(mutationsTypes.END_FILE_PARSING);
export const errorFileParsing = makeAction(mutationsTypes.ERROR_FILE_PARSING);
export const endProjectParsing = makeAction(mutationsTypes.END_PROJECT_PARSING);

export const searchFunction = makeAction(mutationsTypes.SEARCH_FUNCTION);
export const showPreview = makeAction(mutationsTypes.SHOW_PREVIEW);
export const changeActiveProject = makeAction(mutationsTypes.CHANGE_ACTIVE_PROJECT);
export const openNewProject = makeAction(mutationsTypes.OPEN_NEW_PROJECT);
export const closeProject = makeAction(mutationsTypes.CLOSE_PROJECT);
export const changeActiveView = makeAction(mutationsTypes.CHANGE_ACTIVE_VIEW);
export const closeViewTab = makeAction(mutationsTypes.CLOSE_VIEW_TAB);
export const startFunctionNavigation = makeAction(mutationsTypes.START_FUNCTION_NAVIGATION);
export const openFunction = makeAction(mutationsTypes.OPEN_FUNCTION);

function makeAction (type) {
  return ({dispatch}, ...args) => dispatch(type, ...args);
}
