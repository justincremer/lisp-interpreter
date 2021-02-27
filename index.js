// const { Session } = require('./src/utils/session');
const { parse, interpret } = require('./src/utils/interpreter');
const { repl } = require('./src/utils/repl');
const fs = require('fs');

const args = process.argv;

// TODO: Finish session class to handle mutiphrase interpreting in one go.
// This will be necessary to advance file parsing and
// to implement a module system.
if (args.length === 2) {
	while (1) {
		repl();
	}
} else {
	const optArg = args[2];

	if (optArg === '--help' || optArg === '-h' || optArg === '-?') {
		console.log('TODO: write help doc');
		// } else if (/^.*\.(?!lsp|lisp|ljs$)[^.]+$/.test(optArg)) {
	} else if (/\.lsp|.lisp|.ljs$/.test(optArg)) {
		const input = fs.readFileSync(args[2]).toString();
		// const session = new Session(input);
		// console.log(input);
		// console.log(session.getPhrases(input));

		interpret(parse(input));
		// const session = new Session(input);
		// session.multerpret(session.);

		// console.log(session.details);
	} else {
		console.log('not a valid option');
	}
}
