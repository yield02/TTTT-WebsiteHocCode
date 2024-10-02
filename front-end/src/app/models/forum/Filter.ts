export interface Filter {
    page: number;
    name?: string;
    time?: 7 | 14 | 30 | 60 | 90 | 180 | 365 | 'any';
    author?: string;
    hashtag?: [string];
    sortTime?: 'asc' | 'desc';
}