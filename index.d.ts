
type functionInteract = ( providedObject: { id: (string | number), others: any }) => void;

declare class SimpleCRUD {
   constructor(requiredProps?: string[], strictMode?: boolean, defaultValue?: object[]);
   create: (newObject: { id: (number | string)}) => object;
   read: (searchProperty?: object) => object[] | object;
}

export default SimpleCRUD;