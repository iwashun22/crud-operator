# simple-crud

A simple CRUD operator. Supported both types of commonJS and module.

## Installation

```sh
# with npm
npm i --save simple-crud
# with yarn
yarn add simple-crud
```

> commonjs
```js
const crud = require('simple-crud');

const users = new crud();
```

> module
```js
import crud from 'simple-crud';

const users = new crud();
```

<br/>

## Methods

There is only four methods, which are `create`, `read`, `update` and `delete`.

- ### `create`
   Create new object by passing the required properties
   (by default it will be `name` and `id`).

   > NOTE

   Every `id` must be the unique value.
   `id` will be stringified.

   > RETURN

   New object you created.

- ### `read`
   Get the object by finding its required properties.
   When there is no argument, it will return all the items in array.
   If there was more than one matched, it will return a filtered array.

   If `strictMode = false`, it will match string to both lower-case and upper-case

   > RETURN

   Single object or an array.

- ### `update`
   Update the object. You can pass any required properties when the option `strictMode = false`. You can change all the objects if the required properties match. But I recommend to use this method by passing `id`.

- ### `delete`
   Delete the object. This is similar to `update`, but it will only just delete. You can delete multiple items by filtering with required properties, when `strictMode = false`.
   The property needs to be exact match.

   ex. `{ name: 'Jack' } !== { name: 'jack' }`

   > RETURN

   Objects that were deleted.
```js
import crud from 'simple-crud';

// By default, strictMode is set to false.
const users = new crud();

// By default, there is required properties of 'name' and 'id' and you need to include when you create new one.
users.create({ name: 'Jack', id: 'qog2b28b', optional: 'some random text'});
users.create({ name: 'Susan', id: 179128 });

console.log(users.read());
// output: 
//       [{ id: 'qog2b28b', name: 'Jack', optional: 'some random text' },
//         { id: '179128', name: 'Susan' }]

// This works only when strictMode is false
// Otherwise you need to pass id instead
const deletedUser = users.delete({ name: 'Susan'});
```

<br/>

## Options

In the constructor, you can provide to three options. This will help the project easier to match to your purpose.

`option` | `type`
-------|------
requiredProps| string[]
strictMode | boolean
defaultData | object[]

<br/>

> ### requiredProps

`requiredProps` is an Array of string. You will provide the properties every objects need to have.
By default, it will contains `[ 'name', 'id' ]`. If you want to make a custom properties, make sure to put `'id'` because it is required to every objects.

#### **`bad-example.js`**
```js
import crud from 'simple-crud';

const users = new crud(['message', 'name']); // error
```

#### **`good-example.js`**
```js
import crud from 'simple-crud';

const users = new crud(['name', 'id', 'email']);

users.create({ name: 'Luke', id: 'i3gw9h1b', email: 'luke_fakemail@gmail.com'});
```

<br/>

> ### strictMode



> ### defaultData

