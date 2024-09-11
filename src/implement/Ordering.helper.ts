import { OrderBy } from "../core/OrderBy.type.js";

export function orderBy<T extends object>(unorderedData: T[], orderParams: OrderBy<T>) {
   if (typeof unorderedData[0][orderParams.field] === 'number') {
      if (orderParams.param === "ascending")
         //@ts-expect-error
         return unorderedData.toSorted((a, b) => a[orderParams.field] - b[orderParams.field])
      if (orderParams.param === "descending")
         //@ts-expect-error
         return unorderedData.toSorted((a, b) => b[orderParams.field] - a[orderParams.field])
   } else if (typeof unorderedData[0][orderParams.field] === 'string') {
      if (orderParams.param === "ascending")
         //@ts-expect-error
         return unorderedData.toSorted((a, b) => a[orderParams.field].localeCompare(b[orderParams.field]));
      if (orderParams.param === "descending")
         //@ts-expect-error
         return unorderedData.toSorted((a, b) => b[orderParams.field].localeCompare(a[orderParams.field]));
   }
   return unorderedData
}