const categorize = (input) =>
	!isNaN(parseFloat(input))
		? { type: 'number', val: parseFloat(input) }
		: input[0] === '"' && input.slice(-1) === '"'
		? { type: 'string', val: input.slice(1, -1) }
		: { type: 'id', val: input };

const parenthesize = (input, list) => {
	if (list === undefined) {
		return parenthesize(input, []);
	} else {
		const token = input.shift();

		if (token === undefined) {
			return list.pop();
		} else if (token === '(') {
			list.push(parenthesize(input, []));
			return parenthesize(input, list);
		} else if (token === ')') {
			return list;
		} else {
			return parenthesize(input, list.concat(categorize(token)));
		}
	}
};

//TODO: regex split on whitespace except between double quotes
const tokenize = (input) =>
	input
		.split('"')
		.map((x, i) =>
			i % 2 === 0
				? x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
				: x.replace(/\(/g, ' ) ')
		)
		.join('"')
		.trim()
		.split(/\s+/)
		// .split(/\s+(?=([^"]*"[^"]*")*[^"]*$)/);
		// .filter((x) => x !== undefined)
		.map((x) => x.replace(/!whitespace!/g, ' '));

// console.log(tokenize(' (read "output/test.txt")'));

module.exports = (input) => parenthesize(tokenize(input));
