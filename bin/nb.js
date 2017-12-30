#! /usr/bin/env node

const parser = require('argv-parser');

const rules = {
  body: {
    type: String,
    short: 'b'
  },
  password: {
    type: String,
    short: 'p'
  },
  uuid: {
    type: String,
    short: 'u'
  }
};

// TODO: add --help
const argv = parser.parse(process.argv, {rules: rules}).parsed;

const mode = process.argv[2];
if (mode == "create") {
  require('../create')(argv);
} else if (mode == "read") {
  require('../read')(argv);
} else {
  //  TODO: handle non existing mode
}
