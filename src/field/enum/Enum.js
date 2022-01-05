class Enum{
    constructor(...values){
        Object.defineProperty(this, "_values", {value:values, enumerable:false, writable:false, configurable:false});
        values.forEach(v=>Object.defineProperty(this, v, {value:v, enumerable:false, writable:false, configurable:false}));
    }
    isValid(v){return this._values.indexOf(v) > -1;}
}
export {Enum};