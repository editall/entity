import {setProp} from "../util/util.js";

class Entity{
    static union(base, ...sub){
        if(!sub.every(cls=>cls.prototype instanceof base)) throw "invalid subclass";
        const parse = json=>{
            let target;
            if(!sub.some(cls=>Object.entries((target = new cls)._fields).every(([key, field])=>{
                const jsonValue = json[key];
                if(jsonValue === undefined && field.get() === undefined) return false;
                else{
                    target[key] = field.fromJSON(jsonValue);
                    return true;
                }
            }))) throw "no matched sub class";
            return target;
        };
        setProp(base, "parse", parse);
        setProp(base.prototype, "parse", parse);
    }
    constructor() {
        setProp(this, '_fields', {});
    }
    parse(json){
        Object.entries(this._fields).forEach(([key, field])=>{
            const jsonValue = json[key];
            if(jsonValue === undefined && field.get() === undefined) throw 'no key in json:' + key;
            this[key] = field.fromJSON(jsonValue);
        });
        return this;
    }
    toJSON(){return this._fields;}
    define(field, descriptor){
        Object.defineProperty(this, field, this._fields[field] = descriptor);
        return descriptor;
    }
}

export {Entity};