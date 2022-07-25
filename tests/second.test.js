const Crud = require('../lib/index');
const fetch = require('fetch').fetchUrl;

let items;

test('Can fetch and place to default data', () => {
   function fetchDataIntoCRUD(url){
      return new Promise((resolve, reject) => {
         fetch(url, (error, meta, body) => {
            resolve(decodeURI(body));
         })
      })
   }

   fetchDataIntoCRUD('https://jsonplaceholder.typicode.com/users')
      .then((data) => {
         const json = JSON.parse(data);
         items = new Crud(['id', 'name'], true, json);
      })
      .then(() => {
         console.log(items.read({ id: 3 }));
         // JEST
         expect(items.read({id: 3}).website).toBe('ramiro.info');
      })
});