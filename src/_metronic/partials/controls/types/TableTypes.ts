export interface ColumnType {
    Name: string;
    Display: string;
    Sortable?: boolean;
    Formatter?: Function;
    FormatterExtraData?: object;
    Classes?: string;
    HeaderClasses?: string;
    Style?: object;
};

export interface RowType {

};

export interface TableAction<T> {
    cell: string;
    row: T;
    index: number;
    extra: any
}

export interface TableType {
    wrapperClasses?: string;
    classes?: string;
    bordered?: boolean;
    keyField: string;
    data: any[];
    columns: Array<ColumnType>;
    isLoading?: boolean;
    totalCount?: number;
    PageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    orderBy?: string;
    onChange?: Function;
};

export interface ApiResult<T> {
    PageIndex: number;
    PageSize: number;
    TotalCount: number;
    Result: T[];

    IsLoading?: boolean;
    IsError?: boolean;
    Error?: string | null;
}