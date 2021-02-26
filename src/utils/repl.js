const { macros, special } = require('../shared/enums');
const { interpret } = require('./mod');

const complete = (commands) => (str) => {
	const result = [];

	for (let i = 0; i < commands.length; i++) {
		const c = commands[i];

		if (c.indexOf(str) === 0) {
			result.push(c);
		}
	}

	return result;
};

const prompt = require('prompt-sync')({
	autocomplete: complete([...Object.keys(macros), ...Object.keys(special)]),
	sigint: true,
});

console.log();

const repl = () => {
	const input = prompt('> ');
	prompt.history.save();

	if (input === 'clear') {
		console.clear();
	} else if (input === 'exit') {
		console.log('exiting...');
		process.exit(0);
	} else {
		try {
			const result = interpret(input);
			console.log(result);
		} catch (e) {
			console.log(e.message);
		}
	}
};

module.exports = repl;

// const repl = require('repl');

// const options = {
// 	prompt: '> ',
// 	eval: (input, context, filename, callback) => {
// 		const result = interpret(input);
// 		callback(null, result);
// 	},
// };

// module.exports = () => repl.start(options);
