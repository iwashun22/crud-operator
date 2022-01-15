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

## Options

In the constructor, you can provide to three options. This will help the project easier to match to your purpose.

option | type
-------|------
requiredProps| string[]
strictMode | boolean
defaultData | object[]

> ### requiredProps

`requiredProps` is an Array of string. You will provide the properties every objects need to have.
By default, it will contains `[ 'name', 'id ]`. If you want to make a custom properties, make sure to put `'id'` because it is required to every objects.

#### **`example.js`**
```js
import crud from 'simple-crud';

const users = new crud();
```

> ### strictMode



> ### defaultData

