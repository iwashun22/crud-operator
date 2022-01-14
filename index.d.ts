
type functionInteract = ( providedObject: { id: (string | number), others: any }) => void;

declare class SimpleCRUD {
   constructor(requiredProps?: string[], strictMode?: boolean, defaultValue?: object[]);
   create: (newObject: { id: (number | string)}) => object = (newObject): object => {

   };
   read: (searchProperty?: object) => (object[] | object);
}

declare function test(testObj: { id: number, others: any[]}): string;

export default SimpleCRUD;