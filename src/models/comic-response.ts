export interface ComicResponse {
    id: number;
    title: string;
    images: {
        path: string;
        extension: string;
    }[];
}
