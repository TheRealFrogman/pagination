import { OrderBy } from "../core/OrderBy.type.js";
import { Paginated } from "../core/Paginated.js";
import { Pagination_QueryParams } from "../core/PaginatedQueryParams.type.js";
import { Carriage } from "./Carriage.js";
import { orderBy } from "./Ordering.helper.js";

export function paginate<T extends object>(
   dataToPaginate: T[],
   params: Pagination_QueryParams<T>,
): Paginated<T> {
   if (params.orderBy) { var preparedData = orderBy(dataToPaginate, params.orderBy)}
   else { var preparedData = dataToPaginate}

   const { limit, current_page, offset } = params;

   if (limit < 1) throw new Error("incorrect limit")
   if (current_page < 1) throw new Error("incorrect page")

   const carriage = new Carriage(current_page, limit, dataToPaginate.length)
   carriage.shiftBy(offset)

   const clonedData = preparedData
      .slice(carriage.bounds[0], carriage.bounds[1])
      .map(v => Object.assign(Object.create(Object.getPrototypeOf(v)), v))

   let orderedData: T[] | null = null


   return new Paginated({
      count: clonedData.length,
      data: clonedData,
      limit,
      page: carriage.page,
      total_pages: Math.ceil(dataToPaginate.length / limit)
   })
}