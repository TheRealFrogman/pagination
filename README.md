## Usage

```javascript
//Import as an ES6 module:
import { paginate } from "../src/implement/Paginate.js";

// Say we have a User class:

class User {
   constructor(
      public id: string,
      public name: string,
   ) {}
}

//generate an array of mock users:
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
      orderBy: {                      //may be null, applies before pagination
         field: "name",               //field to sort by, could be the id field too
         direction: "ascending",      //ascending or descending                  
      },
      current_page: 2,                //current page
      limit: 5,                       //number of items per page

      offset: -1,                     //page offset, may be negative or positive
                                      //it may be too large and in this case it will return an
                                      //empty array
   },
  
);

console.dir(result);

// logs:
Paginated {
  count: 5,
  limit: 5,
  page: 1,
  data: [
    User { id: '3', name: 'Alex' },
    User { id: '4', name: 'Bartholomew' },
    User { id: '5', name: 'Caleb' },
    User { id: '6', name: 'Dane' },
    User { id: '7', name: 'Ethan' }
  ],
  total_pages: 3
}

```