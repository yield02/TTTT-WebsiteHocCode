export interface Filter {
    start: number;
    end: number;
    sort?: 'desc' | 'asc';
    toString(): string;
}


export function filterToString(filter: Filter): string {
    return `start=${filter.start};end=${filter.end}`;
}