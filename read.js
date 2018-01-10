const Request = require("request");

const ENDPOINT = "https://www.noteburn.org/api/messages/";

const Create = (argv) => {
  const password = argv.password;
  const token = argv.token;
  const uuid = argv.uuid;

  const handleResponse = (err, response, body) => {
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
          console.log(json);
        } else {
          console.log(body);
        }
      } else {
        console.log(" done! Here is the message:");
        console.log("------MESSAGE STARTS BELOW------");
        console.log(json.decrypted_content);
        console.log("--------MESSAGE ENDS ABOVE-------");
        console.log("Message above has already been destroyed.");
      }
    }
  };

  process.stdout.write("Fetching message...");

  if (password) {
    Request.post({url: `${ENDPOINT}${uuid}/`, form: {password: password}}, handleResponse);
  } else if (token) {
    Request.get({url: `${ENDPOINT}${uuid}/${token}`}, handleResponse);
  } else {
  //  TODO: handle missing param
  }
};

module.exports = Create;
