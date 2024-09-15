import { paginate } from "../src/implement/Paginate.js";

class User {
   constructor(
      public id: string,
      public name: string,
   ) {}
}
const users = [
   new User("1", "John"),
   new User("2", "Jane"),
   new User("3", "Alex"),
   new User("4", "Bartholomew"),
   new User("5", "Caleb"),
   new User("6", "Dane"),
   new User("7", "Ethan"),
   new User("8", "Fred"),
   new User("9", "George"),
   new User("10", "Henry"),
   new User("11", "Ian"),
   new User("12", "Jack"),
   new User("13", "Luke"),
];

const result = paginate(users,
   {
      orderBy: {
         field: "name",
         direction: "ascending",
      },
      current_page: 3,
      limit: 5,
      offset: -1,
   },
  
);

console.dir(result);