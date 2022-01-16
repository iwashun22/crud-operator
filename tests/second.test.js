const crud = require('../lib/index');

const users = new crud();
function separateConsole(any) {
   console.log(any)
   console.log('\n=============\n');
}

users.create({ id: '123abc', name: 'Peter', age: 21 });
users.create({ id: 2189, name: 'Susan', email: 'random@gmail.com', age: 16 });

separateConsole(users.read());

users.update({ name: 'susan'}, 'remove', ['email', 'age'])
users.update({ name: 'peter', id: '123abc'}, 'set', { email: 'Peter_mail@gmail.com', age: 22 });

separateConsole(users.read());