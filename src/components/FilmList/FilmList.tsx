import React, {useCallback, useEffect} from 'react';
import styles from '../FilmList/FilmList.module.css';
import Film from '../Film/Film';
import Paginator from '../Paginator/Paginator';
import {useHistory, useParams} from 'react-router';
import {filmsListStore} from '../../stores/FilmsListStore';
import {observer} from 'mobx-react';
import {IRouteParams} from './filmList.types';

const FilmList = () => {
    const history = useHistory();
    const {page} = useParams<IRouteParams>();
    const currentPage: number = +page || 1;

    const onPage = useCallback(({selected}) => {
        history.push('/' + (selected + 1));
    }, [history]);

    useEffect((): void => {
        filmsListStore.setCurrentPage(currentPage);
    }, [currentPage]);

    return (
        <>
            <div className={styles.container}>
                {filmsListStore.data?.results.map((film) => <Film key={film.id} data={film}
                                                                  currentPage={currentPage}/>)}
            </div>
            <Paginator
                initialPage={currentPage ? currentPage - 1 : 0}
                pageCount={filmsListStore.data?.total_pages || 0}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={onPage}
            />
        </>
    );
};

export default observer(FilmList);
