const Request = require("request");
const PrettyJson = require("prettyjson");

const ENDPOINT = "https://hash-msg.herokuapp.com/api/messages/";

const Create = (argv) => {
  const body = argv.body;
  const password = argv.password;

  process.stdout.write("Creating message...");

  Request.post({url: ENDPOINT, form: {decrypted_content: body, password: password}}, (err, response, body) => {
    const statusCode = response && response.statusCode;
    const json = JSON.parse(body);
    if (statusCode != 200) {
      console.log(PrettyJson.render(json, {noColor: true}));
    } else {
      const uuid = json.uuid;

      console.log(" done! Your message can be read with the following command:");
      console.log(`nb read -p ${password} -u ${uuid}`);
      console.log(`or with curl:`);
      console.log(`curl -X POST -d "password=${password}" ${ENDPOINT}${uuid}`);
    }
  });
};

module.exports = Create;
