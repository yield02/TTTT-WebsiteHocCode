export interface Filter {
    start: number;
    end: number;
    toString(): string;
}


export function filterToString(filter: Filter): string {
    return `start=${filter.start};end=${filter.end}`;
}