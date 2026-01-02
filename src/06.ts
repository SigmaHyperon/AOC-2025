import { product, sum } from "./lib/collections.ts";
import { Input } from "./lib/input.ts";

const inputRaw = Input.load(6, false)
const input = inputRaw.asLines().parse(v => v.split(/\s+/).filter(k => k.length > 0));
const numbers = input.asArray().slice(0, -1).map(v => v.map(k => Number(k)));
const operators = input.asArray().slice(-1)[0] as string[];

function part1() {
    const results = operators.map((v, i) => {
        const nums = numbers.map(v => v[i] as number);
        if(v === "+") {
            return sum(nums);
        } else {
            return product(nums);
        }
    });
    return sum(results);
}

console.log(part1());

const input2 = inputRaw.asLines().asArray().map(v => v.split(""));
const transposed = input2[0]?.map((_, i) => input2.slice(0, -1).map(v => v[i]).join("").trim()).map(v => v.length === 0 ? "#" : v).join(",").split(",#,").map(v => v.split(",").map(k => Number(k)));

function part2() {
    const results = operators.map((v, i) => {
        const nums = transposed?.[i] as number[];
        if(v === "+") {
            return sum(nums);
        } else {
            return product(nums);
        }
    });
    return sum(results);
}

console.log(part2());
