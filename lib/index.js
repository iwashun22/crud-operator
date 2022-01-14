class SimpleCRUD {
   #requiredProps;
   #containerArray;
   #strictMode;
   constructor(requiredProp = ['name', 'id'], strictMode = false, defaultData = []) {
      const isArray = Array.isArray(requiredProp);
      if(!isArray) throw new Error(`The constructor's parameter must be an Array`);
      const hasId = requiredProp.find(propName => propName === 'id');
      if(!hasId) throw new Error(`The constructor's Array must contains 'id'`);
      if(requiredProp.length === 1) throw new Error(`You must put other properties aside an 'id'`);
      this.#requiredProps = [...requiredProp];
      this.#containerArray = [];
      this.#strictMode = strictMode;
   }

   create = ({ id, ...others }) => {
      // const { id, ...others} = createNew;
      let newObject = {};
      if(!id) throw new Error(`id is required to every object to create`);
      const existedID = this.#containerArray.find(object => object.id === id);
      if(existedID) throw new Error(`You can not create new object with same id`);
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

   read = (searchProperty) => {
      if(!searchProperty) return this.#containerArray;
      let keys = [];
      for(const key in searchProperty) {
         const requiredKey = this.#requiredProps.find(p => p === key);
         if(!requiredKey) throw new Error(`You can only search by required property`);
         keys.push(key);
      }
      const searchedArray = this.#containerArray.filter(object => {
         let counter = 0;
         keys.forEach(key => {
            if(this.#strictMode){
               if (
                  object[key].toString() ===
                  searchProperty[key].toString()
                )
                  counter++;
            }
            else {
               if(
                  object[key].toString().toLowerCase() === 
                  searchProperty[key].toString().toLowerCase()
               ) counter++;
            }
         })
         return counter === keys.length;
      })
      if(searchedArray.length === 1) {
         return searchedArray[0];
      }
      return searchedArray;
   }

   update = () => {

   }

   delete = () => {

   }
}

const test = (testObj) => {

}

module.exports = SimpleCRUD;