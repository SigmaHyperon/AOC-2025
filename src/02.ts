import { uniques } from "./lib/arrays.ts";
import { Input } from "./lib/input.ts";
import { getDivisors } from "./lib/numbers.ts";
import { slices } from "./lib/strings.ts";

const input = Input.load(2, false);

type Range = {
    start: number;
    end: number;
}

function parse(arg0: string): Range {
    const match = arg0.match(/(\d+)\-(\d+)/);
    if (match === null)
        throw `invalid input: "${arg0}"`;
    return {
        start: Number(match[1]),
        end: Number(match[2])
    }
}
const ranges = input.content.split(",").map(v => parse(v));

function isDoubleSequence(arg0: number): boolean {
    const num = arg0.toString();
    if(num.length % 2 > 0) 
        return false;
    const a = num.slice(0, num.length / 2);
    const b = num.slice(num.length / 2);
    return a === b;
}
function part1(): number {
    let sum = 0;
    for(let range of ranges) {
        for(let i = range.start; i <= range.end; i++) {
            if(isDoubleSequence(i))
                sum += i;
        }
    }
    return sum;
}

console.log(part1());

function isAnySequence(arg0: number): boolean {
    const num = arg0.toString();
    const divisors = getDivisors(num.length).filter( v => v !== num.length);
    for(let div of divisors) {
        const possibleSequences = slices(num, div);
        const uniqueSequences = uniques(possibleSequences);
        if (uniqueSequences.length === 1)
            return true;
    }
    return false;
}

function part2(): number {
    let sum = 0;
    for(let range of ranges) {
        for(let i = range.start; i <= range.end; i++) {
            if(isAnySequence(i)){
                sum += i;
            }
        }
    }
    return sum;
}

console.log(part2());