export type OrderBy<O extends object> = { field: keyof O; param: 'ascending' | 'descending' };
