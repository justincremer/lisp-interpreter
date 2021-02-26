const { macros } = require('../shared/enums');
const { interpret } = require('./mod');

const complete = (commands) => (str) => commands.filter((c) => c.includes(str));

const prompt = require('prompt-sync')({
	autocomplete: complete(['let', 'if', 'lambda', ...Object.keys(macros)]),
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
