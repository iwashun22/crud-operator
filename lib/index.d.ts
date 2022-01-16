declare type SET = 'set';
declare type REMOVE = 'remove';
declare class SimpleCRUD {
    private requiredProps;
    private containerArray;
    private strictMode;
    constructor(requiredProps?: string[], strictMode?: boolean, defaultData?: object[]);
    create: ({ id, ...others }: {
        id: (number | string);
    }) => {};
    read: (searchProperty: object) => any;
    update: (objectToUpdate: {
        id: (string | number);
    }, option: (SET | REMOVE), updateProp: (object | string[])) => void;
    delete: (deleteProp: {
        id: (string | number);
    }) => object | undefined;
}
export default SimpleCRUD;
