// TODO: file extensions should be decided by the user
// TODO: exclude node_modules should be optional (decided by user)
// TODO: handle errors!

let pubsub = require('./pubsub');
let dir = require('node-dir');
let parsers = require('../parsers');

function scanFolder(folder) {

  let fileCallback = (error, content, next) => {
    if (error) throw error;

    try {
      parsers.parse(content);
    } catch(error) {
      console.error('Error scanning a file...');
      console.error(error);
    }

    next();
  };

  let options = {
    match: /.js$/,
    excludeDir: ['node_modules', 'dist', 'lib']
  };

  dir.readFiles(folder, options, fileCallback, () => pubsub.publish('scan-completed', parsers.getAllFunctions()));
}

pubsub.subscribe('start-scan', scanFolder);

exports.scanFolder = scanFolder;
