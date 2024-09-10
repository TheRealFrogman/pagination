import { OrderBy } from "../core/OrderBy.type";
import { Paginated } from "../core/Paginated";
import { Pagination_QueryParams } from "../core/PaginatedQueryParams.type";
import { Carriage } from "./Carriage";
import { orderBy } from "./Ordering.helper";

export function paginate<T extends object>(
   params: Pagination_QueryParams & { orderBy: OrderBy<T> | null },
   dataToPaginate: readonly T[]
): Paginated<T> {
   const { limit, current_page, offset } = params;

   if (limit < 1) throw new Error("incorrect limit")
   if (current_page < 1) throw new Error("incorrect page")

   const carriage = new Carriage(current_page, limit, dataToPaginate.length)
   carriage.shiftBy(offset)

   const clonedData = dataToPaginate
      .slice(carriage.bounds[0], carriage.bounds[1])
      .map(v => Object.assign(Object.create(Object.getPrototypeOf(v)), v))

   let orderedData: T[] | null = null
   if (params.orderBy) orderedData = orderBy(clonedData, params.orderBy)

   return new Paginated({
      count: clonedData.length,
      data: orderedData ?? clonedData,
      limit,
      page: carriage.page,
      total_pages: Math.ceil(dataToPaginate.length / limit)
   })
}