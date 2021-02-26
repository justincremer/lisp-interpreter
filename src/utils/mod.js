const interpreterModule = require('./interpreter');
const replModule = require('./repl');

module.exports.parse = interpreterModule.parse;
module.exports.interpret = interpreterModule.interpret;
module.exports.repl = replModule.repl;

// module.exports.parse = require('./interpreter').parse;
// module.exports.interpret = require('./interpreter').interpret;
// module.exports.autoComplete = require('./repl').autoComplete;
// module.exports.repl = require('./repl').repl;
