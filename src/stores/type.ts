export interface IGenre {
    id: number,
    name: string
}

export interface IFilm {
    adult: boolean,
    backdrop_path: string,
    genres: IGenre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface IData {
    page: number,
    results: IFilm[],
    total_pages: number,
    total_results: number
}
