"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCRUD {
    constructor(requiredProp = ['name', 'id'], strictMode = false, defaultData = []) {
        this.create = (_a) => {
            var { id } = _a, others = __rest(_a, ["id"]);
            // const { id, ...others} = createNew;
            let newObject = {};
            if (!id)
                throw new Error(`id is required to every object to create`);
            const existedID = this.containerArray.find(object => object.id === id);
            if (existedID)
                throw new Error(`You can not create new object with same id`);
            //@ts-ignore
            newObject.id = id.toString();
            // handling the required props
            let counter = 0;
            this.requiredProps.forEach(requiredProp => {
                for (const prop in others) {
                    if (requiredProp === prop) {
                        //@ts-ignore
                        newObject[requiredProp] = others[prop];
                        counter++;
                    }
                }
            });
            // handle if the required property was missing
            if (counter !== this.requiredProps.length - 1)
                throw new Error(`Some required properties were missing`); // -1 because we will get id certainly at the beginning
            // handling other props when they were provided
            for (const key in others) {
                //@ts-ignore
                newObject[key] = others[key];
            }
            this.containerArray.push(newObject);
            return newObject;
        };
        this.read = (searchProperty) => {
            if (!searchProperty)
                return this.containerArray;
            let keys = [];
            for (const key in searchProperty) {
                const requiredKey = this.requiredProps.find(p => p === key);
                if (!requiredKey)
                    throw new Error(`You can only search by required property`);
                keys.push(key);
            }
            const searchedArray = this.containerArray.filter(object => {
                let counter = 0;
                keys.forEach(key => {
                    if (this.strictMode) {
                        if (object[key].toString() ===
                            //@ts-ignore
                            searchProperty[key].toString())
                            counter++;
                    }
                    else {
                        if (object[key].toString().toLowerCase() ===
                            //@ts-ignore
                            searchProperty[key].toString().toLowerCase())
                            counter++;
                    }
                });
                return counter === keys.length;
            });
            if (searchedArray.length === 1) {
                return searchedArray[0];
            }
            return searchedArray;
        };
        this.update = () => {
        };
        this.delete = (deleteProp) => {
            if (!deleteProp)
                throw new Error(`You need to pass the id or required properties to delete`);
            let deletedObject = [];
            if (this.strictMode) {
                for (const prop in deleteProp) {
                    if (prop !== 'id')
                        throw new Error(`You can only delete the object by its id in strict mode`);
                }
                //@ts-ignore
                const index = this.containerArray.findIndex(arr => arr.id === deleteProp.id.toString());
                if (index === -1)
                    return;
                deletedObject = this.containerArray[index];
                this.containerArray.splice(index, 1)[0];
            }
            else {
                let keys = [];
                let indexArr = [];
                for (const key in deleteProp) {
                    const requiredKey = this.requiredProps.find(p => p === key);
                    if (!requiredKey)
                        throw new Error(`You can only delete by required property`);
                    keys.push(key);
                }
                this.containerArray.forEach((object, index) => {
                    let counter = 0;
                    keys.forEach(key => {
                        //@ts-ignore
                        if (object[key].toString().toLowerCase() === deleteProp[key].toString().toLowerCase())
                            counter++;
                    });
                    if (counter === keys.length) {
                        indexArr.push(index);
                    }
                });
                indexArr.forEach((deleteIndex, deletedIndex) => {
                    //@ts-ignore
                    deletedObject.push(this.containerArray[deleteIndex - deletedIndex]);
                    this.containerArray.splice(deleteIndex - deletedIndex, 1)[0];
                });
            }
            //@ts-ignore
            return deletedObject;
        };
        const isArray = Array.isArray(requiredProp);
        if (!isArray)
            throw new Error(`The constructor's parameter must be an Array`);
        const hasId = requiredProp.find(propName => propName === 'id');
        if (!hasId)
            throw new Error(`The constructor's Array must contains 'id'`);
        if (requiredProp.length === 1)
            throw new Error(`You must put other properties aside an 'id'`);
        this.requiredProps = [...requiredProp];
        this.containerArray = [];
        this.strictMode = strictMode;
        if (defaultData) {
            defaultData.forEach(data => {
                for (const prop of this.requiredProps) {
                    //@ts-ignore
                    if (!data[prop])
                        throw new Error(`Data you provided does not have a required properties`);
                }
            });
            defaultData = defaultData.map(data => {
                return Object.assign(Object.assign({}, data), { 
                    //@ts-ignore
                    id: data.id.toString() });
            });
        }
        this.containerArray = [...defaultData];
    }
}
exports.default = SimpleCRUD;
module.exports = SimpleCRUD;
//# sourceMappingURL=index.js.map