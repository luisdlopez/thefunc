'use strict';

import * as mutationsTypes from './mutation-types';
import scanner from '../services/scanner';

export const startScan = ({ dispatch }, path) => {
  scanner
    .scanFolder(path)
    .then(functions => {
      dispatch(mutationsTypes.SCAN_COMPLETED, path, functions);
    });
};

export const scanFolder = makeAction(mutationsTypes.SCAN_FOLDER);
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
