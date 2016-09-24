'use strict';

// TODO: allow for different language parsers
import store from '../../vuex/store';
import * as actions from '../../vuex/actions';
let jsParser = require('./js');

exports.parse = function parse (path, content) {
  actions.startFileParsing(store, path);
  actions.setFileFunctions(store, path, jsParser.getFunctions(content));
  actions.endFileParsing(store, path);
  return;
};
