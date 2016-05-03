export const scanFolder = makeAction('SCAN_FOLDER');
export const searchFunction = makeAction('SEARCH_FUNCTION');
export const showPreview = makeAction('SHOW_PREVIEW');

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
