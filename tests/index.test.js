const crud = require('../lib/index');
// import crud from '../src/index';


////// strict mode

const users_strict = new crud(['name', 'id', 'country']);

users_strict.create({ id: 1234, name: 'Josh', country: 'America', email: 'fakejosh@gmail.com' });
users_strict.create({ id: 9876, name: 'Sally', country: 'Sweden', age: '22' });
users_strict.create({ id: 'abcd', name: 'Kevin', country: 'South Korea', hobbies: ['basketball', 'programming'], device: 'Mac OS' });

describe('\n#### strict mode\n'.toUpperCase(), () => {
   describe('Method: \n\t#create() \n\t#read()', () => {
      test('Can create and read the object', () => {
         expect(users_strict.read({ id: 1234 }).email).toBe('fakejosh@gmail.com');
      });
      test('Can read all the objects', () => {
         expect(users_strict.read().length).toBe(3);
      })
   })

   describe('Method: \n\t#update()', () => {
      test('Can update by setting and creating new properties in an object', () => {
         users_strict.update({id: '9876'}, 'set', { name: 'Susan', email: 'ss@fakemail.com'});
         expect(users_strict.read({id: 9876}).name).toBe('Susan');
      })
      test('Can delete a property of an object', () => {
         users_strict.update({id: 'abcd'}, 'remove', ['device']);
         expect(users_strict.read({id: 'abcd'}).device).toBe(undefined);
         expect(JSON.stringify(users_strict.read({id: 'abcd'}).hobbies)).toBe(JSON.stringify(['basketball', 'programming']));
      })
   })

   describe('Method: \n\t#delete()', () => {
      test('Can delete the object', () => {
         users_strict.delete({ id: '13' });
         expect(users_strict.read().length).toBe(3);
         expect(users_strict.read({ id: '13'})).toBe(undefined);
      })
   })
});



////// non-strict mode

const users_no_strict = new crud(['name', 'id'], false, [{ name: 'Shun', id: 21423}]);

users_no_strict.create({ id: '1bsabcAio2', name: "jack" });
users_no_strict.create({ id: 12, name: "john", email: "jh@gmail.com" });
users_no_strict.create({ id: 13, name: 'John'});

describe('\n#### non-strict mode\n'.toUpperCase(), () => {
   describe('Method: \n\t#create() \n\t#read()', () => {
      test('Can create and read the object', () => {
         expect(users_no_strict.read({ name: 'john', id: 12 }).email).toBe('jh@gmail.com');
      });
      test('Can read all the objects', () => {
         expect(users_no_strict.read().length).toBe(4);
      })
   })

   describe('Method: \n\t#update()', () => {
      test('Can update by setting and creating new properties in an object', () => {
         users_no_strict.update({id: '21423'}, 'set', { name: 'Luke', email: 'lk@fakemail.com'});
         expect(users_no_strict.read({id: 21423}).name).toBe('Luke');
      })
      test('Can delete a property of an object', () => {
         users_no_strict.update({id: 12}, 'remove', ['email']);
         expect(users_no_strict.read({id: 12}).email).toBe(undefined);
      })
   })

   describe('Method: \n\t#delete()', () => {
      test('Can delete the object', () => {
         users_no_strict.delete({ id: '13' });
         expect(users_no_strict.read().length).toBe(3);
         expect(users_no_strict.read({name: 'john', id: '13'})).toBe(undefined);
      })
   })
});