import { Point2 } from "./geometry.ts";

export function uniques<T>(list: T[]): T[] {
    return [...new Set(list)];
}

export function sum(list: number[]): number {
    let sum = 0;
    for(let e of list) {
        sum += e;
    }
    return sum;
}

export enum Direction {
	Up,
	Down,
	Left,
	Right
}

export class Matrix<T> {
	matrix: T[][];
	height: number;
	width: number;
	constructor(matrix: T[][]) {
        if(typeof matrix[0] === "undefined")
            throw `invalid input`;
		this.width = matrix[0].length;
		this.height = matrix.length;
		for(let line of matrix) {
			if(line.length != this.width) {
				throw "Matrix not rectangular";
			}
		}
		this.matrix = matrix.map(v => v.slice());
	}

	public hasValueAt(x: number, y: number): boolean {
		return x >= 0 && x < this.width && y >= 0 && y < this.height;
	}

	public valueAt(x: number, y: number): T | null {
		return this.hasValueAt(x, y) ? this.matrix[y]?.[x] as T : null; 
	}

	public matrixValueAt(x: number, y: number): MatrixValue<T> | null {
        const value = this.valueAt(x, y);
		return value === null ? null : new MatrixValue(x, y, value); 
	}

	public neighbours(x: number, y: number, includeDiagonal: boolean = false): MatrixValue<T>[] {
		const neighbours: (MatrixValue<T> | null)[] = [];
		neighbours.push(this.matrixValueAt(x, y-1));
		neighbours.push(this.matrixValueAt(x-1, y));
		neighbours.push(this.matrixValueAt(x, y+1));
		neighbours.push(this.matrixValueAt(x+1, y));
		if(includeDiagonal) {
			neighbours.push(this.matrixValueAt(x-1, y-1));
			neighbours.push(this.matrixValueAt(x-1, y+1));
			neighbours.push(this.matrixValueAt(x+1, y-1));
			neighbours.push(this.matrixValueAt(x+1, y+1));
		}
		return neighbours.filter(v => v != null);
	}

	public values(): MatrixValue<T>[] {
		const values: MatrixValue<T>[] = [];
		for(let y = 0; y < this.height; y++) {
			for(let x = 0; x < this.width; x++) {
                const value = this.matrixValueAt(x, y);
                if(value === null)
                    throw `no value at x:${x} y:${y}`;
				values.push(value);
			}
		}
		return values;
	}

	public apply(x: number, y: number, manipulator: (current: T) => T) {
		if(this.hasValueAt(x, y)) {
			const current = this.valueAt(x,y);
            if(current === null)
                throw `no value at x:${x} y:${y}`;
			const replaceWith = manipulator(current);
            const row = this.matrix[y];
            if(typeof row === "undefined") 
                throw `no row ${y}`;
			row[x] = replaceWith;
		}
	}

	public isEdge(x: number, y: number): boolean {
		return x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1;
	}

	public rayCast(x: number, y: number, direction: Direction): T[] {
		if(direction === Direction.Left) {
            const row = this.matrix[y];
            if(typeof row === "undefined") 
                throw `no row ${y}`;
			return row.slice(0, x).reverse();
		} else if(direction === Direction.Right) {
            const row = this.matrix[y];
            if(typeof row === "undefined") 
                throw `no row ${y}`;
			return row.slice(x + 1);
		} else if(direction === Direction.Up) {
			const res: T[] = [];
			for(let i = 0; i < y; i++) {
                const value = this.valueAt(x, i);
                if(value === null)
                    throw `no value at x:${x} y:${y}`;
				res.push(value);
			}
			return res.reverse();
		} else {
			const res: T[] = [];
			for(let i = y + 1; i < this.height; i++) {
				const value = this.valueAt(x, i);
                if(value === null)
                    throw `no value at x:${x} y:${y}`;
				res.push(value);
			}
			return res;
		}
	}

	public print(toString?: (value: T) => string) {
		for(let r = 0; r < this.height; r++) {
			const row = this.matrix[r];
            if(typeof row === "undefined") 
                throw `no row ${r}`;
			console.log((toString ? row.map(v => toString(v)) : row).join(","));
		}
	}
}

export class MatrixValue<T> extends Point2 {
	value: T;
	constructor(x: number, y: number, value: T) {
		super(x, y);
		this.value = value;
	}
}