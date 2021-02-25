const parse = require('./parser');
const { Context, library, special } = require('../shared/enums.js');

const interpret = (input, context) => {
	if (context === undefined) {
		return interpret(input, new Context(library));
	} else if (input instanceof Array) {
		return interpretList(input, context);
	} else if (input.type === 'id') {
		return context.get(input.val);
	} else if (['number', 'string'].includes(input.type)) {
		return input.val;
	}
};

const interpretList = (input, context) => {
	if (input.length > 0 && input[0].val in special)
		return special[input[0].val](input, context);

	const list = input.map((x) => interpret(x, context));

	return list[0] instanceof Function
		? list[0].apply(undefined, list.slice(1))
		: list;
};

module.exports = (input, context) => interpret(parse(input));
