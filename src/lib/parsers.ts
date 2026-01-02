import type { Range } from "./types.ts";

export function parseRange(definition: string): Range {
    const match = definition.match(/(\d+)\-(\d+)/);
    if(!match)
        throw `invalid range: ${definition}`;
    const a = Number(match[1]);
    const b = Number(match[2]);
    if(Number.isNaN(a) || Number.isNaN(b))
        throw `invalid range: ${definition}`;
    return {
        start: a,
        end: b
    }
}