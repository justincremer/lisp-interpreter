const interpreterModule = require('./interpreter');
const replModule = require('./repl');
const ioModule = require('./io');

module.exports.parse = interpreterModule.parse;
module.exports.interpret = interpreterModule.interpret;
module.exports.repl = replModule.repl;
module.exports.io = ioModule;
