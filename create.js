const Request = require("request");
const PrettyJson = require("prettyjson");

const ENDPOINT = "https://hash-msg.herokuapp.com/api/messages/";

const Create = (argv) => {
  const body = argv.body;
  const password = argv.password;

  process.stdout.write("Creating message...");

  let form = {};
  form.decrypted_content = body;
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
      console.log(PrettyJson.render(json, {noColor: true}));
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
        const text = `nb read -t "${token}" -u ${uuid}`;
        console.log('-'.repeat(text.length));
        console.log(text);
        console.log('-'.repeat(text.length));
        console.log(`or with curl:`);
        console.log(`curl ${ENDPOINT}${uuid}/${token}`);
      }
      console.log("Your message will self destruct after being read.");
    }
  });
};

module.exports = Create;
