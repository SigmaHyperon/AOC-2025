import fs from "fs";
import path from "path";

export class Input {
    content: string;
    constructor(input: string) {
        this.content = input;
    }
    static load(day: number, test: boolean = false): Input {
        const filename = `${day.toString().padStart(2, "0")}${test ? "-test" : ""}.txt`;
        const filepath = path.join("input", filename);
        return new Input(fs.readFileSync(filepath).toString());
    }

    asLines(): Lines<string> {
        return new Lines(this.content.replace(/^\s+|\s+$/g, '').split('\n'));
    }
}

export class Lines<T> {
    content: T[];
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