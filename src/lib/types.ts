export type Range = {
    start: number;
    end: number;
}

export function simplifyRanges(ranges:Range[]): Range[] {
	if (!Array.isArray(ranges)) {
		throw new TypeError(`Expected an array, got \`${typeof ranges}\`.`);
	}

	if (ranges.length === 0) {
		return [];
	}

	// Normalize ranges
	ranges = ranges
		.map(v => v.start <= v.end ? {start: v.start, end: v.end} : {start: v.end, end: v.start})
		.sort((a, b) => a.start - b.start);

	const result: Range[] = [ranges[0] as Range];

	for (const {start, end} of ranges.slice(1)) {
        const last = result.at(-1) as Range;
		const {start: lastStart, end: lastEnd} = last;

		if (start - 1 <= lastEnd) {
			const newEnd = Math.max(end, lastEnd);
			result[result.length - 1] = {start: lastStart, end: newEnd};
		} else {
			result.push({start, end});
		}
	}

	return result;
}