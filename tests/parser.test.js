const parse = require('../src/utils/parser');
const { dataSets } = require('./enums');

const isArray = (input) =>
	Object.prototype.toString.call(input) === '[object Array]';

const strip = (input) => {
	if (isArray(input)) {
		if (input[0] === undefined) {
			return [];
		} else if (isArray(input[0])) {
			return [strip(input[0])].concat(strip(input.slice(1)));
		} else {
			return strip(input[0]).concat(strip(input.slice(1)));
		}
	} else {
		return [input.val];
	}
};

test('Empty list', () => {
	const input = dataSets.empty;
	const expectedResult = [];

	const result = parse(input);
	const subResult = strip(result);

	expect(subResult).toEqual(expectedResult);
});

test('Numbers', () => {
	const expectedResults = [[1], [1, 2], [1, 2, 3]];

	dataSets.numbers.map((x, i) => {
		const result = parse(x);
		result.map((y) => expect(y.type).toEqual('number'));

		const subResult = strip(result);
		expect(subResult).toEqual(expectedResults[i]);
	});
});

test('Strings', () => {
	const expectedResults = [
		['sophie'],
		['sophie', 'harry'],
		['sophie', 'harry', 'totoro'],
	];

	dataSets.strings.map((x, i) => {
		const result = parse(x);
		result.map((y) => expect(y.type).toEqual('string'));

		const subResult = strip(result);
		expect(subResult).toEqual(expectedResults[i]);
	});
});
