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
  }
};

const argv = parser.parse(process.argv, {rules: rules}).parsed;

const mode = process.argv[2];
if (mode == "create") {
  const Create = require('../create');
  Create(argv)
}
