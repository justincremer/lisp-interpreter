const { interpret } = require('../src/utils/mod');
const { dataSets } = require('./enums');

test('Empty list', () => {
	const data = dataSets.empty;
	const expectedResult = [];

	const result = interpret(data);

	expect(result).toEqual(expectedResult);
});

test('Numbers', () => {
	const data = dataSets.numbers;
	const expectedResults = [[1], [1, 2], [1, 2, 3]];

	data.map((x, i) => {
		const result = interpret(x);

		expect(result).toEqual(expectedResults[i]);
	});
});

test('Strings', () => {
	const data = dataSets.strings;
	const expectedResults = [
		['sophie'],
		['sophie', 'harry'],
		['sophie', 'harry', 'totoro'],
	];

	data.map((x, i) => {
		const result = interpret(x);

		expect(result).toEqual(expectedResults[i]);
	});
});
