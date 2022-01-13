const crud = require('../lib/index');

const user = new crud(['name', 'id']);

user.create({ name: 'John', id: new Date(), email: 'iwashun@gmail.com'})
console.log(user.read());