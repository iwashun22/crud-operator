"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var set = 'set';
var remove = 'remove';
var SimpleCRUD = /** @class */ (function () {
    function SimpleCRUD(requiredProps, strictMode, defaultData) {
        var _this = this;
        if (requiredProps === void 0) { requiredProps = ['name', 'id']; }
        if (strictMode === void 0) { strictMode = false; }
        if (defaultData === void 0) { defaultData = []; }
        this.create = function (_a) {
            var id = _a.id, others = __rest(_a, ["id"]);
            // const { id, ...others} = createNew;
            var newObject = {};
            if (!id)
                throw new Error("id is required to every object to create");
            var existedID = _this.containerArray.find(function (object) { return object.id.toString() === id.toString(); });
            if (existedID)
                throw new Error("You can not create new object with same id");
            //@ts-ignore
            newObject.id = id.toString();
            // handling the required props
            var counter = 0;
            _this.requiredProps.forEach(function (requiredProp) {
                for (var prop in others) {
                    if (requiredProp === prop) {
                        //@ts-ignore
                        newObject[requiredProp] = others[prop];
                        counter++;
                    }
                }
            });
            // handle if the required property was missing
            if (counter !== _this.requiredProps.length - 1)
                throw new Error("Some required properties were missing"); // -1 because we will get id certainly at the beginning
            // handling other props when they were provided
            for (var key in others) {
                //@ts-ignore
                newObject[key] = others[key];
            }
            _this.containerArray.push(newObject);
            return newObject;
        };
        this.read = function (searchProperty) {
            if (!searchProperty)
                return _this.containerArray;
            var keys = [];
            var _loop_1 = function (key) {
                var requiredKey = _this.requiredProps.find(function (p) { return p === key; });
                if (!requiredKey)
                    throw new Error("You can only search by required property");
                keys.push(key);
            };
            for (var key in searchProperty) {
                _loop_1(key);
            }
            var searchedArray = _this.containerArray.filter(function (object) {
                var counter = 0;
                keys.forEach(function (key) {
                    if (_this.strictMode) {
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
        this.update = function (objectToUpdate, option, updateProp) {
            /////////  //////////
            if (option === set && (Array.isArray(updateProp) || typeof updateProp !== 'object'))
                throw new Error("To set the properties needs to provide as an object");
            if (option === remove && !Array.isArray(updateProp))
                throw new Error("You can only pass the array of properties' name when you choose option 'remove'");
            if (option !== set && option !== remove)
                throw new Error("There is only 'set' and 'delete' options");
            //@ts-ignore
            if (option === set && updateProp.id)
                throw new Error("You can not change the 'id'");
            if (option === remove) {
                var _loop_2 = function (requiredProp) {
                    //@ts-ignore
                    if (updateProp.find(function (prop) { return prop === requiredProp; }))
                        throw new Error("You can not remove required properties");
                };
                for (var _i = 0, _a = _this.requiredProps; _i < _a.length; _i++) {
                    var requiredProp = _a[_i];
                    _loop_2(requiredProp);
                }
            }
            //////////////////////
            /// Error handle ///
            if (_this.strictMode) {
                for (var prop in objectToUpdate) {
                    //@ts-ignore
                    if (prop !== 'id')
                        throw new Error("You can only update by passing 'id'");
                }
                //@ts-ignore
                var updateObject = _this.containerArray.find(function (object) { return object.id.toString() === objectToUpdate.id.toString(); });
                if (option === set) {
                    //@ts-ignore
                    for (var prop in updateProp) {
                        //@ts-ignore
                        updateObject[prop] = updateProp[prop];
                    }
                }
                else if (option === remove) {
                    //@ts-ignore
                    for (var _b = 0, updateProp_1 = updateProp; _b < updateProp_1.length; _b++) {
                        var prop = updateProp_1[_b];
                        //@ts-ignore
                        delete objectToUpdate[prop];
                    }
                }
            }
            else {
                var keys_1 = [];
                var _loop_3 = function (prop) {
                    var requiredProp = _this.requiredProps.find(function (p) { return p === prop; });
                    if (!requiredProp)
                        throw new Error("You can only pass the required property");
                    keys_1.push(prop);
                };
                for (var prop in objectToUpdate) {
                    _loop_3(prop);
                }
                var updateObjects_1 = _this.containerArray.filter(function (object) {
                    var counter = 0;
                    //@ts-ignore
                    keys_1.forEach(function (key) {
                        if (key === 'id') {
                            if (object.id.toString() === objectToUpdate.id.toString())
                                counter++;
                        }
                        else {
                            //@ts-ignore
                            if (object[key].toString().toLowerCase() === objectToUpdate[key].toString().toLowerCase())
                                counter++;
                        }
                    });
                    return counter === keys_1.length;
                });
                if (updateObjects_1.length === 0)
                    return;
                if (updateObjects_1.length === 1)
                    updateObjects_1 = updateObjects_1[0];
                if (option === set) {
                    if (Array.isArray(updateObjects_1)) {
                        updateObjects_1 = updateObjects_1.map(function (object) {
                            for (var prop in updateProp) {
                                //@ts-ignore
                                object[prop] = updateProp[prop];
                            }
                            return __assign({}, object);
                        });
                    }
                    else {
                        for (var prop in updateProp) {
                            //@ts-ignore
                            updateObjects_1[prop] = updateProp[prop];
                        }
                    }
                }
                else if (option === remove) {
                    if (Array.isArray(updateObjects_1)) {
                        updateObjects_1 = updateObjects_1.map(function (object) {
                            //@ts-ignore
                            updateProp.forEach(function (prop) {
                                delete object[prop];
                            });
                            return __assign({}, object);
                        });
                    }
                    else {
                        //@ts-ignore
                        updateProp.forEach(function (prop) {
                            delete updateObjects_1[prop];
                        });
                    }
                }
                if (Array.isArray(updateObjects_1)) {
                    updateObjects_1.forEach(function (up_object) {
                        var index = _this.containerArray.findIndex(function (object) { return object.id.toString() === up_object.id.toString(); });
                        _this.containerArray[index] = up_object;
                    });
                }
                else {
                    //@ts-ignore
                    var index = _this.containerArray.findIndex(function (object) { return object.id.toString() === updateObjects_1.id.toString(); });
                    _this.containerArray[index] = updateObjects_1;
                }
            }
        };
        this.delete = function (deleteProp) {
            if (!deleteProp)
                throw new Error("You need to pass the id or required properties to delete");
            var deletedObject = [];
            if (_this.strictMode) {
                for (var prop in deleteProp) {
                    if (prop !== 'id')
                        throw new Error("You can only delete the object by its id in strict mode");
                }
                //@ts-ignore
                var index = _this.containerArray.findIndex(function (arr) { return arr.id === deleteProp.id.toString(); });
                if (index === -1)
                    return;
                deletedObject = _this.containerArray[index];
                _this.containerArray.splice(index, 1)[0];
            }
            else {
                var keys_2 = [];
                var indexArr_1 = [];
                var _loop_4 = function (key) {
                    var requiredKey = _this.requiredProps.find(function (p) { return p === key; });
                    if (!requiredKey)
                        throw new Error("You can only delete by required properties");
                    keys_2.push(key);
                };
                for (var key in deleteProp) {
                    _loop_4(key);
                }
                _this.containerArray.forEach(function (object, index) {
                    var counter = 0;
                    keys_2.forEach(function (key) {
                        //@ts-ignore
                        if (object[key].toString().toLowerCase() === deleteProp[key].toString().toLowerCase())
                            counter++;
                    });
                    if (counter === keys_2.length) {
                        indexArr_1.push(index);
                    }
                });
                indexArr_1.forEach(function (deleteIndex, deletedIndex) {
                    //@ts-ignore
                    deletedObject.push(_this.containerArray[deleteIndex - deletedIndex]);
                    _this.containerArray.splice(deleteIndex - deletedIndex, 1)[0];
                });
            }
            //@ts-ignore
            return deletedObject;
        };
        var isArray = Array.isArray(requiredProps);
        if (!isArray)
            throw new Error("The constructor's parameter must be an Array");
        var hasId = requiredProps.find(function (propName) { return propName === 'id'; });
        if (!hasId)
            throw new Error("The constructor's Array must contains 'id'");
        if (requiredProps.length === 1)
            throw new Error("You must put other properties aside an 'id'");
        this.requiredProps = __spreadArray([], requiredProps, true);
        this.containerArray = [];
        this.strictMode = strictMode;
        if (defaultData) {
            defaultData.forEach(function (data) {
                for (var _i = 0, _a = _this.requiredProps; _i < _a.length; _i++) {
                    var prop = _a[_i];
                    //@ts-ignore
                    if (!data[prop])
                        throw new Error("Data you provided does not have a required properties");
                }
            });
            defaultData = defaultData.map(function (data) {
                return __assign(__assign({}, data), { 
                    //@ts-ignore
                    id: data.id.toString() });
            });
        }
        this.containerArray = __spreadArray([], defaultData, true);
    }
    return SimpleCRUD;
}());
exports.default = SimpleCRUD;
module.exports = SimpleCRUD;
//# sourceMappingURL=index.js.map