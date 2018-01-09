const fs = require('fs');

const read = (fp, opts) => {
  if (typeof fp !== 'string') {
    throw new TypeError('read-file sync expects a string.');
  }
  try {
    return normalize(fs.readFileSync(fp, opts), opts);
  } catch (err) {
    err.message = 'Failed to read "' + fp + '": ' + err.message;
    throw new Error(err);
  }
};

const normalize = (str, opts) => {
  str = stripBom(str);
  if (typeof opts === 'object' && opts.normalize === true) {
    return String(str).replace(/\r\n|\n/g, '\n');
  }
  return str;
};

stripBom = (str) => {
  return typeof str === 'string' && str.charAt(0) === '\uFEFF'
    ? str.slice(1)
    : str;
};

module.exports = read;
