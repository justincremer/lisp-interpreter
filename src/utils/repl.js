const interpret = require('./interpreter');
const prompt = require('prompt-sync')();
// const repl = require('repl');

// const options = {
// 	prompt: '> ',
// 	eval: (input, context, filename, callback) => {
// 		const result = interpret(input);
// 		callback(null, result);
// 	},
// };

// module.exports = () => repl.start(options);
const repl = () => {
	const input = prompt('> ');

	if (input === 'clear') {
		console.clear();
	} else if (input === 'exit') {
		console.log('exiting...');
		process.exit(0);
	} else {
		const result = interpret(input);
		console.log(result);
	}
};

module.exports = repl;
