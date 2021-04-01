import {action, makeObservable, observable} from 'mobx';
import {IFilm} from "./type";

export class FavoriteStore {
    constructor() {
        makeObservable(this, {
            list: observable,
            setFavorites: action
        });
        this.list = this.getFavorites();
    }

    favoritesKey: string = 'favorites';

    list: IFilm[] = [];

    getFavorites = (): IFilm[] => JSON.parse(localStorage.getItem(this.favoritesKey) || '""') || [];


    setFavorites = (list: IFilm[]): void => {
        localStorage.setItem(this.favoritesKey, JSON.stringify(list));
        this.list = list;
    }

    addFavoriteFilm = (film: IFilm): void => this.setFavorites([...this.list, film]);

    checkFavorite = (id: number): boolean => !!this.list.find(film => film.id === id);

    removeFavorite = (id: number): void => this.setFavorites(this.list.filter(film => film.id !== id));
}

export const favoriteStore = new FavoriteStore();
