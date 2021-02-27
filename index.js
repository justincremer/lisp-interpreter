const { repl, interpret } = require('./src/utils/mod');
const fs = require('fs');

const args = process.argv;

if (args.length === 2) {
	while (1) {
		repl();
	}
} else {
	const optArg = args[2];

	if (optArg === '--help' || optArg === '-h' || optArg === '-?') {
		console.log('TODO: write help doc');
	} else if (/\.lsp$/.test(optArg)) {
		const input = fs.readFileSync(args[2]).toString();
		// console.log(input);
		console.log(interpret(input));
	} else {
		console.log('not a valid option');
	}
}
