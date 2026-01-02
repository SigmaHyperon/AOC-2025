import fs from "fs";
import path from "path";
import { Matrix } from "./collections.ts";

export class Input {
    private content: string;
    constructor(input: string) {
        this.content = input;
    }
    static load(day: number, test: boolean = false): Input {
        const filename = `${day.toString().padStart(2, "0")}${test ? "-test" : ""}.txt`;
        const filepath = path.join("input", filename);
        return new Input(fs.readFileSync(filepath).toString().replace(/^\s+|\s+$/g, ''));
    }
    asString(): string {
        return this.content;
    }

    asLines(): Lines<string> {
        return new Lines(this.content.split('\n'));
    }

    asMatrix(): Matrix<string> {
        return new Matrix(this.content.split('\n').map(v => v.split("")));
    }

    asParts(): Input[] {
        return this.content.split("\n\n").map(v => new Input(v));
    }
}

export class Lines<T> {
    private content: T[];
    constructor(input: T[]) {
        this.content = input;
    }

    parse<K>(parser: (arg0: T) => K): Lines<K> {
        return new Lines(this.content.map(v => parser(v)));
    }

    asArray(): T[] {
        return [...this.content];
    }
}