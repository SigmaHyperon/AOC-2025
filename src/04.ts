import { Input } from "./lib/input.ts";

const input = Input.load(4, false).asMatrix();

function part1() {
    return input.values().filter(v => v.value === "@")
        .filter(v => input.neighbours(v.x, v.y, true).filter(k => k.value === "@").length < 4)
        .length;
}

console.log(part1());

function part2() {
    let state = input.copy();
    let removed = 0;
    let removedNow = Infinity;
    while(removedNow > 0) {
        const toRemove = state.values()
            .filter(v => v.value === "@")
            .filter(v => state.neighbours(v.x, v.y, true).filter(k => k.value === "@").length < 4);
        for(let paper of toRemove) {
            state.set(paper.x, paper.y, ".");
        }
        removedNow = toRemove.length
        removed += removedNow;
    }
    return removed;
}

console.log(part2());