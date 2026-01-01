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