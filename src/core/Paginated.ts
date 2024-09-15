export class Paginated<T> {
   readonly count: number;
   readonly limit: number;
   readonly page: number;
   readonly data: T[];
   readonly total_pages: number;

   constructor(props: Paginated<T>) {
      this.count = props.count;
      this.limit = props.limit;
      this.page = props.page;
      this.data = props.data;
      this.total_pages = props.total_pages;
   }
}