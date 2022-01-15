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
               if(!data[prop]) throw new Error(`Data you provided does not have a required properties`);
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
      const existedID = this.containerArray.find(object => object.id === id);
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
      return searchedArray;
   }

   update = (objectToUpdate: object, option: ('set' | 'delete'), updateProp: (object | string[])) => {
      if(this.strictMode) {
         for(const prop in objectToUpdate) {
            //@ts-ignore
            if(prop !== 'id') throw new Error(`You can only update by passing 'id'`);
         }
         //@ts-ignore
         const updateObject = this.containerArray.find(object => object.id === objectToUpdate.id);
         if(option === 'set') {
            if(!Array.isArray(updateProp) && typeof updateProp === 'object') {
               //@ts-ignore
               if(updateProp.id) throw new Error(`You can not change the 'id'`);
               for(const prop in updateProp) {
                  //@ts-ignore
                  updateObject[prop] = updateProp[prop];
               }
            }
            throw new Error(`To set the properties needs to provide as an object`);
         }
         else if(option === 'delete') {
            if(Array.isArray(updateProp)) {
               for(const requiredProp of this.requiredProps) {
                  if(updateProp.find(prop => prop === requiredProp))
                  throw new Error(`You can not delete required properties`);
               }
               for(const prop of updateProp) {
                  //@ts-ignore
                  delete objectToUpdate[prop];
               }
            }
            throw new Error(`You can only pass the array of properties' name when you choose option 'delete'`);
         }
         else throw new Error(`There is only 'set' and 'delete' options`);
      }
      else {
         
      }
   }

   delete = (deleteProp: { id: string | number, otherRequiredProps?: string |number }) => {
      if(!deleteProp) throw new Error(`You need to pass the id or required properties to delete`);
      let deletedObject: object | object[] = [];
      if(this.strictMode) {
         for(const prop in deleteProp) {
            if(prop !== 'id') throw new Error(`You can only delete the object by its id in strict mode`);
         }
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
            if(!requiredKey) throw new Error(`You can only delete by required property`);
            keys.push(key);
         }
         this.containerArray.forEach((object, index) => {
            let counter: number = 0;
            keys.forEach(key => {
               //@ts-ignore
               if(object[key].toString() === deleteProp[key].toString()) counter++;
            })
            if(counter === keys.length){
               indexArr.push(index);
            }
         })
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