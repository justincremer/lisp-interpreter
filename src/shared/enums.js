// An object of all in range variables, with a pointer to it's containing scope
class Context {
	constructor(scope, parent) {
		this.scope = scope;
		this.parent = parent;
	}

	get = (id) => {
		if (id in this.scope) {
			return this.scope[id];
		} else if (this.parent !== undefined) {
			this.parent.get(id);
		}
	};
}

// Standard API functions
const library = {
	car: (x) => x[0],
	cdr: (x) => x.slice(1),
	cons: (x, y) => {
		y.unshift(x);
		return y;
	},
};

// Special functions
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

module.exports = { Context, library, special };
