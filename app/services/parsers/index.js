'use strict';

// TODO: allow for different language parsers
import store from '../../vuex/store';
import * as actions from '../../vuex/actions';
let jsParser = require('./js');

exports.parse = function parse (path, content) {
  actions.startFileParsing(store, path);
  jsParser
    .getFunctions(path, content)
    .then(functions => {
      actions.setFileFunctions(store, path, functions);
      actions.endFileParsing(store, path);
    })
    .catch(error => {
      console.error(error);
      actions.errorFileParsing(store, path);
    });
};
