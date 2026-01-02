import { sum } from "./lib/collections.ts";
import { Input } from "./lib/input.ts";
import { parseRange } from "./lib/parsers.ts";
import { simplifyRanges } from "./lib/types.ts";

const [_ranges, _items] = Input.load(5, false).asParts().map(v => v.asLines());

if(!_ranges || !_items)
    throw `invalid input`;

const ranges = _ranges.parse(v => parseRange(v));
const items = _items.parse(v => Number(v));

function part1() {
    let fresh = 0;
    it: for(let item of items.asArray()) {
        for(let range of ranges.asArray()) {
            if(item >= range.start && item <= range.end) {
                fresh++;
                continue it;
            }
        }
    }
    return fresh;
}

console.log(part1());

function part2() {
    const mergedRanges = simplifyRanges(ranges.asArray());
    return sum(mergedRanges.map(v => (v?.end - v?.start) + 1));
}

console.log(part2());