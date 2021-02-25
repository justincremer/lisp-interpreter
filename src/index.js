const repl = require('./utils/repl');

const args = process.argv;

if (args.length === 2) {
	repl();
} else {
	const optArg = args[2];

	if (optArg === '--help' || optArg === '-h' || optArg === '-?') {
		console.log('TODO: write help doc');
	} else if (/\.lsp$/.test(optArg)) {
		console.log('valid file');
	} else {
		console.log('not a valid option');
	}
}
