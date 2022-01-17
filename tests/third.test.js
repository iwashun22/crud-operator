const crud = require('../lib/index');
const fetch = require('node-fetch');

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