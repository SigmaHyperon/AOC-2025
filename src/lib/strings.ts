export function slices(arg0: string, length: number): string[] {
    return Array.from({ length: Math.ceil(arg0.length / length) }, (v, i) => arg0.slice(i * length, i * length + length));
}