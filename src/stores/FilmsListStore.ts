import {action, autorun, makeObservable, observable, runInAction} from 'mobx';
import {IData} from './type';

export class FilmsListStore {
    constructor() {
        makeObservable(this,
            {
                data: observable,
                currentPage: observable,
                loadPage: action,
                setCurrentPage: action
            });
    }

    data?: IData;

    currentPage?: number;

    async loadPage(page: number): Promise<void> {
        const url: string = `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${page}`;
        const response = await fetch(url);
        const data: IData = await response.json();

        runInAction(() => {
            this.data = data;
        });
    }

    setCurrentPage(page: number): void {
        this.currentPage = page;
    }
}

export const filmsListStore = new FilmsListStore();

autorun(() => {
    if (filmsListStore.currentPage) {
        filmsListStore.loadPage(filmsListStore.currentPage);
    }
});
