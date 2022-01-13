class SimpleCRUD {
   #requiredProps;
   #containerArray;
   constructor(arr = ['name', 'id'], defaultData = [], strictMode = false) {
      const isArray = Array.isArray(arr);
      if(!isArray) throw new Error(`The constructor's parameter must be an Array`);
      const hasId = arr.find(propName => propName === 'id');
      if(!hasId) throw new Error(`The constructor's Array must contains 'id'`);
      if(arr.length === 1) throw new Error(`You must put other properties aside an 'id'`);
      this.#requiredProps = [...arr];
      this.#containerArray = [];
   }
   create = ({ id, ...others}) => {
      let newObject = {};
      if(!id) throw new Error(`id is required to every object to create`);
      newObject.id = id;

      // handling the required props
      let counter = 0;
      this.#requiredProps.forEach(requiredProp => {
         for(const prop in others){
            if(requiredProp === prop) {
               newObject[requiredProp] = others[prop];
               counter++;
            }
         }
      })
      // handle if the required property was missing
      if(counter !== this.#requiredProps.length - 1) throw new Error(`Some required properties were missing`); // -1 because we will get id certainly at the beginning

      // handling other props when they were provided
      for(const key in others) {
         newObject[key] = others[key];
      }
      this.#containerArray.push(newObject);
      return newObject;
   }
   read = (searchObject) => {
      if(!searchObject) return this.#containerArray;
   }
   update = () => {

   }
   delete = () => {

   }
}

module.exports = SimpleCRUD;