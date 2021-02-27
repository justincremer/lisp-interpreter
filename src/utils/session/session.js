const { parse, interpret } = require('../interpreter');

class Session {
	constructor(input, definitions = null, isRepl = false) {
		this.input = input;
		this.isRepl = isRepl;
		this.definitions = definitions;
		this.start = Date.now();
	}

	getPhrases = (input) => {
		let result = [];
		let left = 0,
			right = 0;

		input.split('').map((t) => {
			let current = [];

			if (right > 0 && left === right) {
				result.push(current);
				current = [];
				left = 0;
				right = 0;
			} else {
				current.push(t.val);

				if (t === '(') {
					left++;
				} else if (t === ')') {
					right++;
				}
			}
		});

		// for (t of parse(input)) {
		// 	let current = [];

		// 	if (right > 0 && left === right) {
		// 		result.push(current);
		// 		current = [];
		// 		left = 0;
		// 		right = 0;
		// 	} else {
		// 		current.push(t);

		// 		if (t === '(') {
		// 			left++;
		// 		} else if (t === ')') {
		// 			right++;
		// 		}
		// 	}
		// }

		return result;
	};

	multerpret = (input) => {
		this.getPhrases(input).map((p) => interpret(p));
	};

	details = () =>
		new Object({
			uptime: `${Date.now() - this.start / 1000}s`,
		});

	// deconstructor() {
	// 	this.finish = Date.now();
	// 	return this.details(finish);
	// }
}

module.exports = Session;
