import { UUID } from "crypto";
import { Entity } from "./Entity";

export class User extends Entity<User> {
   constructor(
      id: UUID,
      public email: string,
      public login: string,
      public firstName: string,
      public lastName: string,
   ) { super(id); }
}