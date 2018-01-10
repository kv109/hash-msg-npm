# Noteburn CLI

Noteburn CLI is a package which uses [noteburn.org](https://www.noteburn.org/) API
to share sensitive data easily and safely through self-destructing messages.

## Install

```shell
npm install -g nb
``` 

## Create message

#### Example
```shell
$ nb create -b "login:kacper, password:doctor-who"
```

#### Example with file
```shell
$ nb create -f package.json
```

#### Output
```shell
Creating message... done! Your message can be read with the following command:
---------------------------------------------------------
nb read -t 26f7364a0bec2a22 -u 72d5b9c60669b30e1190433e21
---------------------------------------------------------
or with curl:
curl https://www.noteburn.org/api/messages/72d5b9c60669b30e1190433e21/26f7364a0bec2a22?output=raw
```

#### Usage
```shell
usage: nb create [-h] [-b BODY] [-f FILE] [-p PASSWORD]

Optional arguments:
  -h, --help            Show this help message and exit.
  -b BODY, --body BODY  Your message. Incompatible with --file.
  -f FILE, --file FILE  Create message from content of FILE. Incompatible with --body.
```

## Read message

#### Example
```shell
nb read -t 26f7364a0bec2a22 -u 72d5b9c60669b30e1190433e21
```
#### Output
```shell
Fetching message... done! Here is the message:
------MESSAGE STARTS BELOW------
login:kacper, password:i-forgot-my-password
--------MESSAGE ENDS ABOVE-------
Message above has already been destroyed.
```

#### Usage
```shell
usage: nb read [-h] -u UUID [-p PASSWORD] [-t TOKEN]

Optional arguments:
  -h, --help            Show this help message and exit.
  -u UUID, --uuid UUID  Your message UUID. UUID is generated and displayed when you create a message.
  -t TOKEN, --token TOKEN Token to decrypt your message with. Token is generated and displayed when you create a message.
```