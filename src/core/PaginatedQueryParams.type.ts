import { OrderBy } from "./OrderBy.type.js";

export type Pagination_QueryParams<T extends object> = {
   limit: number;
   current_page: number;
   offset: number;
} & { orderBy: OrderBy<T> | null };