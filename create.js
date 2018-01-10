const Request = require("request");
const ReadFile = require('./lib/read-file');

const ENDPOINT = "https://www.noteburn.org/api/messages/";

const Create = (argv) => {
  const body = argv.body;
  const file = argv.file;
  const password = argv.password;

  process.stdout.write("Creating message...");

  let form = {};

  if (body) {
    form.decrypted_content = body;
  } else if (file) {
    const fileBody = ReadFile(file, {encoding: 'utf8'});
    form.decrypted_content = fileBody;
  }

  if (password) {
    form.password = password
  }

  Request.post({url: ENDPOINT, form: form}, (err, response, body) => {
    const statusCode = response && response.statusCode;

    let json = null;
    try {
      json = JSON.parse(body);
    } catch (e) {
    }

    if (statusCode != 200) {
      console.log(json);
    } else {
      const token = json.token;
      const uuid = json.uuid;

      console.log(" done! Your message can be read with the following command:");
      if (password) {

        const text = `nb read -p ${password} -u ${uuid}`;
        console.log('-'.repeat(text.length));
        console.log(`nb read -p ${password} -u ${uuid}`);
        console.log('-'.repeat(text.length));
        console.log(`or with curl:`);
        console.log(`curl -X POST -d "password=${password}" ${ENDPOINT}${uuid}`);
      } else {
        const text = `nb read -t ${token} -u ${uuid}`;
        console.log('-'.repeat(text.length));
        console.log(text);
        console.log('-'.repeat(text.length));
        console.log(`or with curl:`);
        console.log(`curl ${ENDPOINT}${uuid}/${token}?output=raw`);
      }
      console.log("Your message will self destruct after being read.");
    }
  });
};

module.exports = Create;
