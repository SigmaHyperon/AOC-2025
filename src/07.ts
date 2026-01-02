import { sum, type Matrix, type MatrixValue } from "./lib/collections.ts";
import { Input } from "./lib/input.ts";

const input = Input.load(7, false).asMatrix();

function part1() {
    const manifold = input.copy();
    while(manifold.rayCast(0, manifold.height - 1, "right").every(v => v !== "|")) {
        const raysources = manifold.values().filter(v => v.value === "S" || v.value === "|");
        for(let source of raysources) {
            const next = manifold.neighbour(source.x, source.y, "down");
            if(next !== null && next.value === ".") {
                manifold.set(next.x, next.y, "|");
            } else if(next !== null && next.value === "^") {
                const left = manifold.neighbour(next.x, next.y, "left");
                if(left !== null && left.value === ".") {
                    manifold.set(left.x, left.y, "|");
                }
                const right = manifold.neighbour(next.x, next.y, "right");
                if(right !== null && right.value === ".") {
                    manifold.set(right.x, right.y, "|");
                }
            }
        }
    }
    return manifold.values().filter(v => v.value === "^").map(v => manifold.neighbour(v.x, v.y, "up")).filter(v => v?.value === "|").length;
}

console.log(part1());

function part2() {
    const manifold = input.copy() as Matrix<string | number>;
    for(let row = 0; row < manifold.height; row++) {
        const raysources = manifold.values().filter(v => v.y === row).filter(v => v.value === "S" || typeof v.value === "number") as MatrixValue<"S" | number>[];
        for(let source of raysources) {
            const next = manifold.neighbour(source.x, source.y, "down");
            if(next === null) {
                continue;
            } else if(next.value === ".") {
                manifold.set(next.x, next.y, source.value === "S" ? 1 : source.value);
            } else if(typeof next.value === "number") {
                manifold.set(next.x, next.y, typeof source.value === "string" ? 1 + next.value : source.value + next.value);
            } else if(next.value === "^") {
                const left = manifold.neighbour(next.x, next.y, "left");
                if(left !== null && (left.value === "." || typeof left.value === "number")) {
                    manifold.set(left.x, left.y, left.value === "." ? source.value : (source.value === "S" ? 1 : source.value) + left.value);
                }
                const right = manifold.neighbour(next.x, next.y, "right");
                if(right !== null && (right.value === "." || typeof right.value === "number")) {
                    manifold.set(right.x, right.y, right.value === "." ? source.value : (source.value === "S" ? 1 : source.value) + right.value);
                }
            }
        }
    }
    return sum(manifold.rayCast(0, manifold.height - 1, "right", true).filter(v => typeof v === "number"));
}

console.log(part2());