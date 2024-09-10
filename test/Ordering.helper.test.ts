import { describe, it } from 'node:test';
import assert from 'assert';
import { orderBy } from '../src/implement/Ordering.helper';

describe('orderBy function', () => {
   it('should sort numbers in ascending order', () => {
      const data = [{ id: 3, value: 10 }, { id: 1, value: 5 }, { id: 2, value: 8 }];
      const sortedData = orderBy(data, { field: 'value', param: 'ascending' });
      assert.deepEqual(sortedData, [
         { id: 1, value: 5 },
         { id: 2, value: 8 },
         { id: 3, value: 10 },
      ]);
   });

   it('should sort numbers in descending order', () => {
      const data = [{ id: 3, value: 10 }, { id: 1, value: 5 }, { id: 2, value: 8 }];
      const sortedData = orderBy(data, { field: 'value', param: 'descending' });
      assert.deepEqual(sortedData, [
         { id: 3, value: 10 },
         { id: 2, value: 8 },
         { id: 1, value: 5 },
      ]);
   });

   it('should sort strings in ascending order', () => {
      const data = [{ id: 3, name: 'Charlie' }, { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const sortedData = orderBy(data, { field: 'name', param: 'ascending' });
      assert.deepEqual(sortedData, [
         { id: 1, name: 'Alice' },
         { id: 2, name: 'Bob' },
         { id: 3, name: 'Charlie' },
      ]);
   });

   it('should sort strings in descending order', () => {
      const data = [{ id: 3, name: 'Charlie' }, { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const sortedData = orderBy(data, { field: 'name', param: 'descending' });
      assert.deepEqual(sortedData, [
         { id: 3, name: 'Charlie' },
         { id: 2, name: 'Bob' },
         { id: 1, name: 'Alice' },
      ]);
   });

   it('should return original data if field type is not supported', () => {
      const data = [{ id: 1, isActive: true }];
      const sortedData = orderBy(data, { field: 'isActive', param: 'ascending' });
      assert.deepEqual(sortedData, data);
   });
});