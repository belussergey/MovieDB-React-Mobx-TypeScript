export interface IOnPageProps {
    selected: number
}

export interface IPaginatorProps {
    marginPagesDisplayed: number,
    initialPage: number,
    pageCount: number,
    pageRangeDisplayed: number,

    onPageChange(pageParams: IOnPageProps): void
}

