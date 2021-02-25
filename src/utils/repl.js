const repl = require('repl');
const interpret = require('./interpreter');

const options = {
	prompt: '> ',
	eval: (input, context, filename, callback) =>
		callback(null, interpret(input)),
};

module.exports = () => repl.start(options);
