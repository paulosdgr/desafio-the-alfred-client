import { ComicResponse } from './comic-response';

export interface HeroResponse {
    id: number;
    name: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    description: string;
    comics?: ComicResponse[];
}
