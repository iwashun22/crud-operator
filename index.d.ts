declare class SimpleCRUD {
    private requiredProps;
    private containerArray;
    private strictMode;
    constructor(requiredProp?: string[], strictMode?: boolean, defaultData?: object[]);
    create: ({ id, ...others }: {
        id: (number | string);
    }) => {};
    read: (searchProperty: object) => any;
    update: () => void;
    delete: (deleteProp: {
        id: string | number;
        otherRequiredProps?: string | number;
    }) => object | object[];
}
export default SimpleCRUD;
