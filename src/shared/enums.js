// An object of all in range variables, with a pointer to its parent context
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

const inlines = {
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

// const macros = {
// 	write: (x) => x,
// 	car: (x) => x[0],
// 	cdr: (x) => x.slice(1),
// 	cons: (x, y) => {
// 		y.unshift(x);
// 		return y;
// 	},
// };

const macros = {
	print: (x) => x,
	first: (x) => x[0],
	rest: (x) => x.slice(1),
	construct: (x, y) => {
		y.unshift(x);
		return y;
	},
};

const library = { ...inlines, ...macros };

module.exports = { Context, library, macros, inlines };
