interface property {
   id: ( string | number ),
   others?: any
}

type functionInteract = ( { id, ...others } : property) => {
   object: object
};

declare class SimpleCRUD {
   constructor(requiredProps?: string[], defaultValu?: object[], strictMode?: boolean);
   create: functionInteract;
}

export default SimpleCRUD;