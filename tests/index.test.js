const crud = require('../lib/index');
// import crud from '../src/index';

const users = new crud(['name', 'id'], false, [{ name: 'Shun', id: 21423}]);

function separateConsole(any) {
   console.log(any);
   console.log('\n========================\n');
}

users.create({ id: '1bsabcAio2', name: "jack" });
users.create({ id: 12, name: "john", email: "jh@gmail.com" });
users.create({ id: 13, name: 'John'})

separateConsole(users.read({ name: 'john', id: 12 }));
separateConsole(users.read({ name: 'John' }));
separateConsole(users.read());

users.delete({ id: '12' });

separateConsole(users.read());

users.create({ id: 15, name: 'Susan', email: 'Susan@fake.mail'});
users.create({ id: '29sca2', name: 'jack', 'web-site': 'https://fakeweb.com'});
users.create({ id: 911028410, name: 'Jack', email: 'jackie@gmail.com'});

separateConsole(users.read());
separateConsole(users.delete({ name: 'Jack' }));
separateConsole(users.read());

// only update with exact match
users.update({ name: 'shun' }, 'set', { email: 'iwashun@gmail.com', age: 17});

separateConsole(users.read({ name: 'Shun'}));

users.update({ name: 'Susan' }, 'remove', ['email']);

separateConsole(users.read({ name: 'susan' }));
separateConsole(users.read());