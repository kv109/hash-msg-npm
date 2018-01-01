#! /usr/bin/env node

const ArgumentParser = require("argparse").ArgumentParser;

const parser = new ArgumentParser({
  addHelp: true,
  description: "Noteburn CLI",
  version: "0.0.1"
});

const subparsers = parser.addSubparsers({
  title: "subcommands",
  dest: "subcommand_name"
});

const createParser = subparsers.addParser("create", {addHelp: true});
const readParser = subparsers.addParser("read", {addHelp: true});

createParser.addArgument(
  ["-b", "--body"],
  {
    help: "Your message.",
    required: true
  }
);

createParser.addArgument(
  ["-p", "--password"],
  {
    help: "Password to encrypt your message with."
  }
);

readParser.addArgument(
  ["-u", "--uuid"],
  {
    help: "Your message UUID. UUID is generated and displayed when you create a message.",
    required: true
  }
);

readParser.addArgument(
  ["-p", "--password"],
  {
    help: "Password to encrypt your message with."
  }
);

readParser.addArgument(
  ["-t", "--token"],
  {
    help: "Token to encrypt your message with."
  }
);

const args = parser.parseArgs();

const mode = process.argv[2];

if (mode == "create") {
  require("../create")(args);
} else if (mode == "read") {
  require("../read")(args);
}
