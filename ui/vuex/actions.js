'use strict';

export const scanFolder = makeAction('SCAN_FOLDER');
export const searchFunction = makeAction('SEARCH_FUNCTION');
export const showPreview = makeAction('SHOW_PREVIEW');
export const changeActiveProject = makeAction('CHANGE_ACTIVE_PROJECT');
export const openNewProject = makeAction('OPEN_NEW_PROJECT');
export const closeProject = makeAction('CLOSE_PROJECT');
export const changeActiveView = makeAction('CHANGE_ACTIVE_VIEW');
export const closeViewTab = makeAction('CLOSE_VIEW_TAB');
export const startFunctionNavigation = makeAction('START_FUNCTION_NAVIGATION');
export const openFunction = makeAction('OPEN_FUNCTION');

function makeAction (type) {
  return ({dispatch}, ...args) => dispatch(type, ...args);
}
