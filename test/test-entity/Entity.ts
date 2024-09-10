import { UUID } from "crypto";

export class Entity<T extends Entity<any>> {
   constructor(
      public id: UUID
   ) { }
   isById(input: Entity<T>): boolean {
      return this.id === input.id
   }
}