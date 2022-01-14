const crud = require('../lib/index');

const user = new crud(['name', 'id']);

user.create({ id: 12, name: "john", email: "iwashun@gmail.com" });
user.create({ id: 13, name: 'John'})
console.log(user.read({ name: 'john' }));
