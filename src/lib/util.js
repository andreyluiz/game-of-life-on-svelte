export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const generateId = () =>
	Math.random()
		.toString(36)
		.substr(2);
