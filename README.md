# [crud-operator](https://www.npmjs.com/package/crud-operator) &middot; [![GitHub license](https://img.shields.io/badge/license-GNU-red.svg)](https://github.com/iwashun22/npm-simple-crud/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/crud-operator?style=flat)](https://www.npmjs.com/package/crud-operator)

Usage: Make a simple CRUD.

## Installation

```sh
# with npm
npm install --save crud-operator
# with yarn
yarn add crud-operator
```

> commonJS
```js
const crud = require('crud-operator');
const users = new crud();
```

> ES module
```js
import crud from 'crud-operator';
const users = new crud();
```

<br/>

## Methods

There are four methods, `create`, `read`, `update` and `delete`.
Down here is the example of some codes.
These codes are when the `strictMode` is `false`

```js
import crud from 'crud-operator';

const users = new crud();
```

- ### `create`
   Create new object by passing the required properties
   (by default it will be `name` and `id`).

   > **NOTE**

   - Every `id` must be the unique value.
   - `id` will be stringified.
   - When you provide an `id` as an integer number, don't put the 0 infront. It will cause an error.

   > **RETURN**

   New object you created.

   *example*

   ```js
   users.create({ id: '123abc', name: 'Peter', age: 21 });
   users.create({ id: 2189, name: 'Susan', email: 'random@gmail.com', age: 16 }); // this id will get stringified
   ```


- ### `read`
   Get the object by finding its required properties.
   When there is no argument, it will return all the items into single array.
   If there was more than one matched, it will return a filtered array.

   If `strictMode` is `false`, it will match string to both lower-case and upper-case

   ex. `{ name: 'john' }` will include `{ name: 'John' }`

   > **RETURN**

   Single object or an array.

   *example*

   ```js
   const allUsers = users.read(); // get all the users
   console.log(allUsers);
   // output: 
   //       [{ id: '123abc', name: 'Peter' },
   //         { id: '2189', name: 'Susan', email: 'random@gmail.com' }]

   console.log(
      users.read({ name: 'peter' });
   ) // log only users with name peter (include upper-case)
   ```

- ### `update`
   Update the object. You can pass any required properties when the option `strictMode` is `false`. But better to use this method by passing `id`. 

   **Types**

   You need to provide a second parameter of string to specify what type of update you want to do.

   - `set` 
   : Set or change the properties. You can change what ever you want except `id`.
   In the third parameter, you will include the objects to set.
   - `remove` 
   : Remove properties. You can remove all properties that are not in required lists.
   In the third parameter, you will include the array of string. Those are the properties name that you want to remove.


   > **RETURN**

   Nothing

   *emample*
   ```js
   // Even though the name Susan was started with a capital 'S', it will matched when using non-strictMode
   users.update({ name: 'susan'}, 'delete', ['email', 'age'])

   // id needs to be exact same, therefore this code won't work.
   users.update({ name: 'peter', id: '123ABC'}, 'set', { email: 'Peter_mail@gmail.com', age: 22 });
   ```

- ### `delete`
   Delete the object. This is similar to `update`. You can delete multiple items by filtering with required properties, when `strictMode` is `false`.

   > **RETURN**

   Objects that were deleted.

   *example*
   ```js
   const deletedUser = users.delete({ id: '123abc' });

   console.log( users.read() ); // only one user left inside the array
   console.log( users.read({ name: 'peter' }) ); // this will not log anything because there is no user with name peter

   console.log(`${deletedUser.name} has lefted`);
   ```

## Example code

```js
import crud from 'crud-operator';

// By default, strictMode is set to false.
const users = new crud();

// By default, there is required properties of 'name' and 'id' and you need to include them.
users.create({ name: 'Jack', id: 'qog2b28b', optional: 'some random text'});
users.create({ name: 'Susan', id: 179128 });

console.log(users.read());
// output: 
//       [{ id: 'qog2b28b', name: 'Jack', optional: 'some random text' },
//         { id: '179128', name: 'Susan' }]

// This works only when strictMode is false
// Otherwise you need to pass only id
const deletedUser = users.delete({ name: 'Susan'});
```

<br/>

## Options

In the constructor, you can provide three options. This will help the project match to your purpose.

`option` | `type`
-------|------
requiredProps| string[]
strictMode | boolean
defaultData | object[]

<br/>

- ## **requiredProps**

`requiredProps` is an Array of string. You will provide the properties every objects need to have.
By default, it will contains `[ 'name', 'id' ]`. If you want to make a custom properties, make sure to put `'id'` because it is required to every objects.

#### **`bad-example.js`**
```js
import crud from 'crud-operator';

const users = new crud(['message', 'name']); // error
```

#### **`good-example.js`**
```js
import crud from 'crud-operator';

const users = new crud(['name', 'id', 'email']);

users.create({ name: 'Luke', id: 'i3gw9h1b', email: 'luke_fakemail@gmail.com'});
```

<br/>

- ## **strictMode**

By default, this value is set to `false`.

> #### **Differences**

   - **`true`**
      - Every string needs to be the exact match.
      - Can not `update`, `delete` other than `id`.

   - **`false`**
      - Every string will matched both of upper-case and lower-case.
      - Can `update`, `delete` by any required properties.

   > **NOTE**

   When you are using non-strictMode, the string of id won't match in both upper-case and lower-case. Although the id needs to be exact same, it can match number and string.

   ex. `{ id: 123 }` will be `{ id: '123' }`

<br/>

- ## **defaultData**

You can provide the data what you already had, or the data you fetch. However, those data need to have the required properties.

*example*
```js
let users;

async function fetchDataIntoCRUD(url){
   const data = await fetch(url);
   const json = await data.json();
   users = await new crud(['name', 'id'], true, json);
}

fetchDataIntoCRUD('https://jsonplaceholder.typicode.com/users')
.then(() => {
   console.log(users.read());
})
```
