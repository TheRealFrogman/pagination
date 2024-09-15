export type OrderBy<O extends object> = { field: keyof O; direction: 'ascending' | 'descending' };
