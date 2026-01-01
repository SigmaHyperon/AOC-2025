export function uniques<T>(list: T[]): T[] {
    return [...new Set(list)];
}