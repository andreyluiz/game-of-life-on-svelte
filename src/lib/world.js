const ALIVE = 1;
const DEAD = 0;

export class World {
	constructor(source = []) {
		this.source = source;
		this.row = 0;
		this.column = 0;
	}

	setCell(row, column) {
		this.row = row;
		this.column = column;
	}

	getCellStatus() {
		return this.source[this.row][this.column];
	}

	isCellAlive() {
		return this.getCellStatus() === ALIVE;
	}

	getTopLeft() {
		if (this.source[this.row - 1] && this.source[this.row - 1][this.column - 1]) {
			return this.source[this.row - 1][this.column - 1];
		}
		return 0;
	}

	getTop() {
		if (this.source[this.row - 1]) {
			return this.source[this.row - 1][this.column];
		}
		return 0;
	}

	getTopRight() {
		if (this.source[this.row - 1] && this.source[this.row - 1][this.column + 1]) {
			return this.source[this.row - 1][this.column + 1];
		}
		return 0;
	}

	getRight() {
		if (this.source[this.row] && this.source[this.row][this.column + 1]) {
			return this.source[this.row][this.column + 1];
		}
		return 0;
	}

	getBottomRight() {
		if (this.source[this.row + 1] && this.source[this.row + 1][this.column + 1]) {
			return this.source[this.row + 1][this.column + 1];
		}
		return 0;
	}

	getBottom() {
		if (this.source[this.row + 1]) {
			return this.source[this.row + 1][this.column];
		}
		return 0;
	}

	getBottomLeft() {
		if (this.source[this.row + 1] && this.source[this.row + 1][this.column - 1]) {
			return this.source[this.row + 1][this.column - 1];
		}
		return 0;
	}

	getLeft() {
		if (this.source[this.row] && this.source[this.row][this.column - 1]) {
			return this.source[this.row][this.column - 1];
		}
		return 0;
	}

	getNeighborsCount() {
		const top = this.getTop();
		const right = this.getRight();
		const bottom = this.getBottom();
		const left = this.getLeft();
		const topLeft = this.getTopLeft();
		const topRight = this.getTopRight();
		const bottomRight = this.getBottomRight();
		const bottomLeft = this.getBottomLeft();
		return top + right + bottom + left + topLeft + topRight + bottomRight + bottomLeft;
	}
}

const isEmpty = object => Object.keys(object).length === 0;

export const nextWorld = (input, rules) => {
	const output = [];

	const world = new World(input);

	for (let row = 0, lenR = input.length; row < lenR; row += 1) {
		const rowArray = [];

		for (let column = 0, lenC = input[row].length; column < lenC; column += 1) {
			world.setCell(row, column);

			const status = world.getCellStatus();
			const neighbors = world.getNeighborsCount();
			const matchedRule = rules.find(rule => rule.is === status && rule.has.includes(neighbors));

			if (!matchedRule || isEmpty(matchedRule)) {
				rowArray.push(0);
			} else {
				rowArray.push(matchedRule.becomes);
			}
		}

		output.push(rowArray);
	}

	return output;
};

export const initialWorld = {
	cols: 20,
	rows: 20,
};

export const buildNewWorld = (rows, cols) => {
	const world = new Array(cols);
	for (let i = 0; i < cols; i += 1) {
		world[i] = new Array(rows).fill(0);
	}
	return world;
};

export const template = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
