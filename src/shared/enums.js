// An object of all in range variables, with a pointer to its parent context

const Context = function (scope, parent) {
	this.scope = scope;
	this.parent = parent;

	this.get = (id) => {
		if (id in this.scope) {
			return this.scope[id];
		} else if (this.parent !== undefined) {
			return this.parent.get(id);
		} else return `Error: Invalid expression => ${id}`;
	};
};

const primitives = {
	'+': (x, y) => x + y,
	'-': (x, y) => x - y,
	'*': (x, y) => x * y,
	'/': (x, y) => (y !== 0 ? x / y : 'Infinity, and not the good kind'),

	'=': (x, y) => x == y,
	'>': (x, y) => x > y,
	'<': (x, y) => x < y,
	'>=': (x, y) => x >= y,
	'<=': (x, y) => x <= y,
	'!': (x) => !x,
	and: (x, y) => x && y,
	or: (x, y) => x || y,
};

const macros = {
	print: (x) => console.log(x),
	first: (x) => x[0],
	rest: (x) => x.slice(1),
	construct: (x, y) => {
		y.unshift(x);
		return y;
	},
};

const library = { ...primitives, ...macros };

module.exports = { Context, library, macros, primitives };
