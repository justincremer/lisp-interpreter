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

// Standard functions
const library = {
	write: (x) => x,
	car: (x) => x[0],
	cdr: (x) => x.slice(1),
	cons: (x, y) => {
		y.unshift(x);
		return y;
	},
};

module.exports = { Context, library };
