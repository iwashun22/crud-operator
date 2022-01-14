
type functionInteract = ( providedObject: { id: (string | number), others: any }) => void;

declare class SimpleCRUD {
   constructor(requiredProps?: string[], defaultValue?: object[], strictMode?: boolean);
   create: (newObject: { id: (number | string)}) => object;
   read = () => {

   }
}

export default SimpleCRUD;