const { interpret } = require('../interpreter');
// const { autoComplete } = require('.');

const prompt = require('prompt-sync')({
	// autocomplete: autoComplete,
	sigint: true,
});

const repl = () => {
	const input = prompt('> ');

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
