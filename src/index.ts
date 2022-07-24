
// ****** update() ****** //
type SET = 'set';
type REMOVE = 'remove';

const set: SET = 'set';
const remove: REMOVE = 'remove';

class SimpleCRUD {
   private requiredProps: string[];
   private containerArray: any[];
   private strictMode: boolean;
   constructor(requiredProps: string[] = ['name', 'id'], strictMode: boolean = false, defaultData: object[] = []) {
      const isArray = Array.isArray(requiredProps);
      if(!isArray) throw new Error(`The constructor's parameter must be an Array`);
      const hasId = requiredProps.find(propName => propName === 'id');
      if(!hasId) throw new Error(`The constructor's Array must contains 'id'`);
      if(requiredProps.length === 1) throw new Error(`You must put other properties aside an 'id'`);
      this.requiredProps = [...requiredProps];
      this.containerArray = [];
      this.strictMode = strictMode;
      if(defaultData) {
         defaultData.forEach(data => {
            for(const prop of this.requiredProps) {
               //@ts-ignore
               if(!data[prop]) throw new Error(`Data you provided does not have the required properties`);
            }
         })
         defaultData = defaultData.map(data => {
            return {
               ...data,
               //@ts-ignore
               id: data.id.toString()
            }
         })
      }
      this.containerArray = [...defaultData];
   }

   create = ({ id, ...others }: { id: (number | string) }) => {
      // const { id, ...others} = createNew;
      let newObject = {};
      if(!id) throw new Error(`id is required to every object to create`);
      const existedID = this.containerArray.find(object => object.id.toString() === id.toString());
      if(existedID) throw new Error(`You can not create new object with same id`);
      //@ts-ignore
      newObject.id = id.toString();

      // handling the required props
      let counter = 0;
      this.requiredProps.forEach(requiredProp => {
         for(const prop in others){
            if(requiredProp === prop) {
               //@ts-ignore
               newObject[requiredProp] = others[prop];
               counter++;
            }
         }
      })
      // handle if the required property was missing
      if(counter !== this.requiredProps.length - 1) throw new Error(`Some required properties were missing`); // -1 because we will get id certainly at the beginning

      // handling other props when they were provided
      for(const key in others) {
         //@ts-ignore
         newObject[key] = others[key];
      }
      this.containerArray.push(newObject);
      return newObject;
   }

   read = (searchProperty: object) => {
      if(!searchProperty) return this.containerArray;
      let keys: string[] = [];
      for(const key in searchProperty) {
         const requiredKey = this.requiredProps.find(p => p === key);
         if(!requiredKey) throw new Error(`You can only search by required property`);
         keys.push(key);
      }
      const searchedArray = this.containerArray.filter(object => {
         let counter = 0;
         keys.forEach(key => {
            if(this.strictMode){
               if (
                  object[key].toString() ===
                  //@ts-ignore
                  searchProperty[key].toString()
                )
                  counter++;
            }
            else {
               if(
                  object[key].toString().toLowerCase() === 
                  //@ts-ignore
                  searchProperty[key].toString().toLowerCase()
               ) counter++;
            }
         })
         return counter === keys.length;
      })
      if(searchedArray.length === 1) {
         return searchedArray[0];
      }
      else if(!searchedArray.length) {
         return undefined;
      }
      return searchedArray;
   }

   update = (objectToUpdate: { id: (string | number) }, option: (SET | REMOVE), updateProp: (object | string[])) => {

   /////////  //////////
      if(option === set && (Array.isArray(updateProp) || typeof updateProp !== 'object')) 
         throw new Error(`To set the properties needs to provide as an object`);

      if(option === remove && !Array.isArray(updateProp))
         throw new Error(`You can only pass the array of properties' name when you choose option 'remove'`);

      if(option !== set && option !== remove) throw new Error(`There is only 'set' and 'remove' options`);

      //@ts-ignore
      if(option === set && updateProp.id) throw new Error(`You can not change the 'id'`);

      if(option === remove){
         for(const requiredProp of this.requiredProps) {
            //@ts-ignore
            if(updateProp.find(prop => prop === requiredProp))
            throw new Error(`You can not remove required properties`);
         }
      }
   //////////////////////
   /// Error handle ///

      if(this.strictMode) {
         for(const prop in objectToUpdate) {
            //@ts-ignore
            if(prop !== 'id') throw new Error(`You can only update by passing 'id'`);
         }
         //@ts-ignore
         const updateObject = this.containerArray.find(object => object.id.toString() === objectToUpdate.id.toString());
         if(!updateObject) return;
         if(option === set) {
            //@ts-ignore
            for(const prop in updateProp) {
               //@ts-ignore
               updateObject[prop] = updateProp[prop];
            }
         }
         else if(option === remove) {
            //@ts-ignore
            for(const prop of updateProp) {
               //@ts-ignore
               delete objectToUpdate[prop];
            }
         }
      }
      else {
         let keys: string[] = [];
         for(const prop in objectToUpdate) {
            const requiredProp = this.requiredProps.find(p => p === prop);
            if(!requiredProp) throw new Error(`You can only pass the required property`);
            keys.push(prop);
         }
         let updateObjects = this.containerArray.filter(object => {
            let counter: number = 0;
            //@ts-ignore
            keys.forEach(key => {
               if(key === 'id') {
                  if(object.id.toString() === objectToUpdate.id.toString())
                  counter++;
               }
               else {
                  //@ts-ignore
                  if(object[key].toString().toLowerCase() === objectToUpdate[key].toString().toLowerCase())
                  counter++;
               }
            })
            return counter === keys.length;
         })
         if(updateObjects.length === 0 || !updateObjects) return;
         if(updateObjects.length === 1) updateObjects = updateObjects[0]; 

         if(option === set) {
            if(Array.isArray(updateObjects)){
               updateObjects = updateObjects.map(object => {
                  for(const prop in updateProp) {
                     //@ts-ignore
                     object[prop] = updateProp[prop];
                  }
                  return {...object};
               })
            }
            else {
               for(const prop in updateProp) {
                  //@ts-ignore
                  updateObjects[prop] = updateProp[prop];
               }
            }
         }
         
         else if(option === remove) {
            if(Array.isArray(updateObjects)) {
               updateObjects = updateObjects.map(object => {
                  //@ts-ignore
                  updateProp.forEach(prop => {
                     delete object[prop]
                  })
                  return {...object};
               })
            }
            else {
               //@ts-ignore
               updateProp.forEach(prop => {
                  delete updateObjects[prop];
               })
            }
         }

         if(Array.isArray(updateObjects)) {
            updateObjects.forEach(up_object => {
               const index = this.containerArray.findIndex(object => object.id.toString() === up_object.id.toString());
               this.containerArray[index] = up_object;
            })
         }
         else {
            //@ts-ignore
            const index = this.containerArray.findIndex(object => object.id.toString() === updateObjects.id.toString());
            this.containerArray[index] = updateObjects;
         }
      }
   }

   delete = (deleteProp: { id: (string | number) }) => {
      if(!deleteProp) throw new Error(`You need to pass the id or required properties to delete`);
      let deletedObject: object | object[] = [];
      if(this.strictMode) {
         if(deleteProp['id']) throw new Error(`You can only delete the object by its 'id' in strict mode`);
         //@ts-ignore
         const index = this.containerArray.findIndex(arr => arr.id === deleteProp.id.toString());
         if(index === -1) return;
         deletedObject = this.containerArray[index];
         this.containerArray.splice(index, 1)[0];
      }
      else {
         let keys: string[] = [];
         let indexArr: number[] = [];
         for(const key in deleteProp) {
            const requiredKey = this.requiredProps.find(p => p === key);
            if(!requiredKey) throw new Error(`You can only delete by required properties`);
            keys.push(key);
         }
         this.containerArray.forEach((object, index) => {
            let counter: number = 0;
            keys.forEach(key => {
               if(key === 'id') {
                  //@ts-ignore
                  if(object.id.toString() === deleteProp.id.toString()) counter++;
               }
               else{
                  //@ts-ignore
                  if(object[key].toString().toLowerCase() === deleteProp[key].toString().toLowerCase()) counter++;
               }
            })
            if(counter === keys.length){
               indexArr.push(index);
            }
         })
         if(indexArr.length === 0) return;
         indexArr.forEach((deleteIndex, deletedIndex) => {
            //@ts-ignore
            deletedObject.push(this.containerArray[deleteIndex - deletedIndex]);
            this.containerArray.splice(deleteIndex - deletedIndex, 1)[0];
         });
      }
      //@ts-ignore
      return deletedObject;
   }
}

export default SimpleCRUD;
module.exports = SimpleCRUD;