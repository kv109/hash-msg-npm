#! /usr/bin/env node

const ReadFile = require("../lib/read-file");

const rootPath = require('path').dirname(require.main.filename) + "/..";

const argv = require("../lib/minimist")(process.argv.slice(2));
const mode = argv._[0];
const manifest = JSON.parse(ReadFile(`${rootPath}/package.json`));
const version = argv.v || argv.version;

if (version) {
  console.log(`Noteburn CLI/${manifest.version}`);
  return
}

if (mode == "create") {
  const body = argv.b || argv.body;
  const help = argv.h || argv.help;
  const file = argv.f || argv.file;

  if (help) {
    console.log(`usage: nb create [-h] [-b BODY] [-f FILE] [-p PASSWORD]

Optional arguments:
  -h, --help            Show this help message and exit.
  -b BODY, --body BODY  Your message. Incompatible with --file.
  -f FILE, --file FILE  Create message from content of FILE. Incompatible with --body.`);
    return
  }

  if (body && file) {
    console.error("--body and --file are incompatible, choose one of them");
    return
  }

  if (!body && !file) {
    console.error("missing argument: --body or --file");
    return
  }

  if (body && typeof body !== 'string') {
    console.error("--body has to be a string");
    return
  }

  if (file && typeof file !== 'string') {
    console.error("--file has to be a string (path to file)");
    return
  }

  require("../create")({file, body});
} else if (mode == "read") {
  const help = argv.h || argv.help;
  const token = argv.t || argv.token;
  const uuid = argv.u || argv.uuid;

  if (help) {
    console.log(`usage: nb read [-h] -u UUID [-p PASSWORD] [-t TOKEN]

Optional arguments:
  -h, --help            Show this help message and exit.
  -u UUID, --uuid UUID  Your message UUID. UUID is generated and displayed when you create a message.
  -t TOKEN, --token TOKEN Token to decrypt your message with. Token is generated and displayed when you create a message.`);
    return
  }

  require("../read")({token, uuid});
} else {
  console.log(`usage: nb [-h] [-v] {create,read}`);
}
