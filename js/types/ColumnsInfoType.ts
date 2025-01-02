export type ColumnsType =
    | 'int'
    | 'float'
    | 'str'
    | 'bool'
    | 'object'
    | 'datetime64[ns]'
    | 'timedelta64[ns]'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'float16'
    | 'float32'
    | 'float64';

export type ColumnInfoType = {
    column: string
    type: ColumnsType
}

export type ColumnsInfoType = ColumnInfoType[]