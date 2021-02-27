const fs = require('fs');

const read = (path) => fs.readFileSync(path).toString();
const write = (path, content) => fs.writeFileSync(path, content);

module.exports.read = read;
module.exports.write = write;
