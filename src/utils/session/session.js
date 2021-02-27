class Session {
	constructor(definitions) {
		this.start = Date.now();
		this.definitions = definitions;
	}

	details = () =>
		new Object({ uptime: `${(Date.now() = this.start) / 1000}s` });

	deconstructor() {
		this.finish = Date.now();
		return this.details();
	}
}
