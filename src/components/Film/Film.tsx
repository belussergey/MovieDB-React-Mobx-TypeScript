import React, {useCallback} from 'react';
import styles from './Film.module.css';
import {useHistory} from 'react-router';
import {IFilmProps} from './film.types';

const Film: React.FC<IFilmProps> = ({data: {poster_path, title, id}, currentPage}) => {
    const history = useHistory();

    const handleToDetails = useCallback((): void => {
        history.push(`/details/${currentPage}/${id}`);
    }, [currentPage, history, id]);

    return (
        <div>
            <img className={styles.posterImg} src={`http://image.tmdb.org/t/p/w342${poster_path}`} alt={title}
                 onClick={handleToDetails}/>
        </div>
    );
};

export default Film;
