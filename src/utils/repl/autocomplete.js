const { macros } = require('../../shared/enums');

const dictionary = ['if', 'let', 'lambda', ...Object.keys(macros)];

const filterParens = (input) =>
	input
		.split('')
		.filter((c) => '()'.includes(c))
		.toString();

const currentTerm = (input) => {
	const pList = input.split(' ');
	const len = pList.length;

	if (len > 1) {
		const result = filterParens(pList[len - 1]);

		// console.log(result);
		return result;
	} else {
		const result = filterParens(pList[0]);

		// console.log(result);
		return result;
	}
};

const complete = (commands) => (str) => {
	const input = currentTerm(str);

	const result = commands.filter((c) => c.includes(input));
	return result;
};

module.exports = complete(dictionary);
