const Request = require("request");
const PrettyJson = require("prettyjson");

const ENDPOINT = "https://hash-msg.herokuapp.com/api/messages/";

const Create = (argv) => {
  const password = argv.password;
  const uuid = argv.uuid;

  process.stdout.write("Fetching message...");

  Request.post({url: `${ENDPOINT}${uuid}/`, form: {password: password}}, (err, response, body) => {
    const statusCode = response && response.statusCode;
    let json = null;
    try {
      json = JSON.parse(body);
    } catch (e) {
    }
    if (statusCode == 404) {
      console.log("...ERROR! Could not find the message. It could expire or somebody already deleted it.");
    } else {
      if (statusCode != 200) {
        console.log();
        if (json) {
          console.log(PrettyJson.render(json, {noColor: true}));
        } else {
          console.log(body);
        }
      } else {
        console.log(" done! Here is the message:");
        console.log("------MESSAGE STARTS BELOW------");
        console.log(json.decrypted_content);
        console.log("--------MESSAGE ENDS ABOVE-------");
      }
    }
  });
};

module.exports = Create;