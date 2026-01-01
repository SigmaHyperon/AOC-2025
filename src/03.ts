import { sum } from "./lib/collections.ts";
import { Input } from "./lib/input.ts";

const banks = Input.load(3, false).asLines().parse(v => v.split("").map(k => Number(k))).asArray();

function findBankJoltage(bank: number[]): number {
    const maxFirst = Math.max(...bank.slice(0, bank.length - 1));
    const firstIndex = bank.findIndex(v => v === maxFirst);
    const maxSecond = Math.max(...bank.slice(firstIndex + 1));
    return maxFirst * 10 + maxSecond;
}

function part1(): number {
    return sum(banks.map(v => findBankJoltage(v)));
}

console.log(part1());

function findBankJoltage2(bank: number[], active: number): number {
    const joltages: number[] = [];
    let start = 0;
    for(let i = 0; i < active; i++) {
        const endOffset = - active + joltages.length + 1;
        const max = Math.max(...bank.slice(start, endOffset < 0 ? endOffset : undefined));
        const index = bank.findIndex(v => v === max);
        joltages.push(max);
        start = bank.slice(start).findIndex(v => v === max) + start + 1;
    }
    const jolt = Number(joltages.join(""));
    return jolt;
}

function part2(): number {
    return sum(banks.map(v => findBankJoltage2(v, 12)));
}
console.log(part2());