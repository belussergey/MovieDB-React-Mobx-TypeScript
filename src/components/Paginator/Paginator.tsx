import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginator.module.scss';
import {IPaginatorProps} from './paginator.types';

const Paginator: React.FC<IPaginatorProps> = (props) => {
    return (
        <div className={styles.paginatorContainer}>
            <ReactPaginate {...props} containerClassName={styles.paginator}/>
        </div>)
};

export default Paginator;
