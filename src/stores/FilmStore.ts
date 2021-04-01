import {action, autorun, computed, makeObservable, observable, runInAction} from 'mobx';
import {filmsListStore} from './FilmsListStore';
import {favoriteStore} from './FavoriteStore';
import {IFilm} from './type';

export class FilmStore {
    constructor() {
        makeObservable(this, {
            film: observable,
            id: observable,
            currentFilmIndex: computed,
            isFavorite: computed,
            fetchFilm: action,
            getNextFilmUrl: action,
            setId: action
        });
    }

    film?: IFilm;

    id?: number;

    get currentFilmIndex(): number {
        const index: number = filmsListStore.data?.results.findIndex((film) => film.id === this.id) || 0;

        return index > -1 ? index : 0;
    }

    get isFavorite(): boolean {
        return typeof this.id === 'number' ? favoriteStore.checkFavorite(this.id) : false;
    }

    async fetchFilm(id: number): Promise<void> {
        const url: string = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-RU`;
        const response = await fetch(url);
        const data: IFilm = await response.json();

        runInAction(() => {
            this.film = data;
        });
    }

    async getNextFilmUrl() {
        let nextIndex: number = this.currentFilmIndex + 1;
        let nextPage: number = filmsListStore.currentPage || 1;

        if (this.currentFilmIndex + 1 === filmsListStore.data?.results.length) {
            await filmsListStore.loadPage(nextPage + 1);
            nextPage += 1;
            nextIndex = 0;
        }
        return (`/details/${nextPage}/${filmsListStore.data?.results[nextIndex].id}`);
    }

    setId(id: number): void {
        this.id = id;
    }
}

export const filmStore = new FilmStore();

autorun(() => {
    if (filmStore.id) {
        filmStore.fetchFilm(filmStore.id);
    }
});
