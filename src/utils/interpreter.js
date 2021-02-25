const parse = require('./parser');
const { Context, library } = require('../shared/enums.js');

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

const special = {
	let: (input, context) => () =>
		interpret(
			input[2],
			input[1].reduce((acc, x) => {
				acc.scope[x[0].value] = interpret(x[1], context);
				return acc;
			}, new Context({}, context))
		),

	if: (input, context) =>
		interpret(input[1], context)
			? interpret(input[2], context)
			: interpret(input[3], context),

	lambda: (input, context) => () =>
		interpret(
			input[2],
			new Context(
				input[1].reduce((acc, x, i) => {
					acc[x.value] = arguments[i];
					return acc;
				}, {}),
				context
			)
		),
};

module.exports = (input, context) => interpret(parse(input));
