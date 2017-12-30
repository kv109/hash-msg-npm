#! /usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
  addHelp: true,
  description: 'Noteburn CLI'
});

const mode = process.argv[2];

if (mode == "create") {
  parser.addArgument(
    ['-b', '--body'],
    {
      help: 'Your message.',
      required: true
    }
  );

  parser.addArgument(
    ['-p', '--password'],
    {
      help: 'Password to encrypt your message with.'
    }
  );

  require('../create')(parser.parseArgs());
} else if (mode == "read") {
  parser.addArgument(
    ['-u', '--uuid'],
    {
      help: 'Your message UUID. UUID is generated and displayed when you create a message.',
      required: true
    }
  );

  parser.addArgument(
    ['-p', '--password'],
    {
      help: 'Password to encrypt your message with.',
      required: true
    }
  );

  require('../read')(parser.parseArgs());
} else {
  parser.addArgument(['create'], {help: "see: nb create -h"});
  parser.addArgument(['read'], {help: "see: nb read -h"});
  parser.parseArgs()

  // console.log("see nb create --help or nb read --help");
}
