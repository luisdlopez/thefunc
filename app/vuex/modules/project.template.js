const FILE_STATE = require('../../services/parsers/file.state.enum');

export default {
  path: '',
  directoryTree: null,
  scanned: false,
  parsed: FILE_STATE.NOT_PARSED,
  lastScan: null,
  activeView: 0,
  views: [{
    title: 'Search',
    search: '',
    filteredDirectoryTree: null,
    preview: ''
  }],
  scan: {
    parsedFunctions: {},
    functionNames: [],
    error: [],
    stats: {}
  }
};
